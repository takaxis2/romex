import ExpoModulesCore // Expo Modules API
import MediaPipeTasksVision // MediaPipe Pose Landmarker 라이브러리
import UIKit // 이미지 처리 및 파일 경로 접근에 사용됨

// MARK: - 1 & 2. Record 정의 (Kotlin의 Record와 1:1 대응)

// Kotlin의 LandmarkRecord에 대응
public struct LandmarkRecord: Record {
    @Field public var x: Double = 0.0
    @Field public var y: Double = 0.0
    @Field public var z: Double = 0.0
    @Field public var visibility: Double = 0.0
}

// Kotlin의 PoseResultRecord에 대응
public struct PoseResultRecord: Record {
    // List<List<LandmarkRecord>> 는 Swift에서 [[LandmarkRecord]]로 대응됩니다.
    @Field public var landmarks: [[LandmarkRecord]] = []
}

// MARK: - PoseDetectionModule 클래스 정의

public class PoseDetectionModule: Module {
    
    // 3. PoseLandmarker Task를 초기화합니다. (Lazy Loading)
    // Android의 landmarker by lazy { ... } 와 동일
    private lazy var landmarker: PoseLandmarker = {
        guard let context = appContext.reactDelegate?.appContext else {
            fatalError("Expo AppContext is not available.")
        }
        return initializePoseLandmarker(context: context)
    }()

    private func initializePoseLandmarker(context: AppContext) -> PoseLandmarker {
        // assets 폴더의 모델 파일 이름. (ios/Assets/pose_landmarker_full.task 에 위치해야 하며, .podspec에 번들링되어야 함)
        let modelFileName = "pose_landmarker_full"
        let modelFileType = "task"
        
        // 1. 앱 번들(Bundle)에서 모델 파일 경로를 찾습니다.
        guard let modelPath = Bundle.main.path(forResource: modelFileName, ofType: modelFileType) else {
            fatalError("Failed to find MediaPipe model file in app bundle.")
        }
        
        // 2. PoseLandmarker 옵션 설정
        let baseOptions = BaseOptions(modelAssetPath: modelPath)
        let options = PoseLandmarkerOptions(
            baseOptions: baseOptions,
            runningMode: .image, // 정지 이미지 모드
            numPoses: 1
        )
        
        // 3. PoseLandmarker 인스턴스 생성
        do {
            return try PoseLandmarker(options: options)
        } catch {
            fatalError("Failed to initialize PoseLandmarker: \(error)")
        }
    }
    
    // MARK: - Module Definition

    public func definition() -> ModuleDefinition {
        Name("PoseDetectionModule")

        // 4. JS에서 호출할 함수를 정의합니다. (Android의 Function("detectPoseFromFile")과 동일)
        Function("detectPoseFromFile") { (path: String) -> PoseResultRecord in
            
            // 4-1. 파일 경로 (path)에서 이미지(UIImage) 로드
            guard let url = URL(string: path), 
                  let data = try? Data(contentsOf: url),
                  let image = UIImage(data: data) else {
                throw NSError(domain: "PoseDetection", code: 404, userInfo: [NSLocalizedDescriptionKey: "Invalid file path or unable to load image data."])
            }
            
            // 4-2. MediaPipe의 이미지 형식(MPImage)으로 변환
            // iOS에서는 UIImage를 MPImage로 바로 변환합니다.
            guard let mpImage = try? MPImage(uiImage: image) else {
                throw NSError(domain: "PoseDetection", code: 500, userInfo: [NSLocalizedDescriptionKey: "Failed to create MediaPipe Image."])
            }
            
            // 4-3. 추론 실행
            let result = try self.landmarker.detect(image: mpImage)
            
            // 4-4. 결과를 JS Record 형식으로 변환하여 반환
            return self.toJSObject(result: result)
        }
    }
}

// MARK: - 확장 함수 (Kotlin의 toJSObject()와 동일)

extension PoseDetectionModule {
    
    // 5. PoseLandmarkerResult 객체를 JS의 Record 형식으로 변환합니다.
    private func toJSObject(result: PoseLandmarkerResult) -> PoseResultRecord {
        var poseResult = PoseResultRecord()
        var allLandmarks: [[LandmarkRecord]] = []

        // 감지된 사람(List)을 순회합니다.
        result.landmarks.forEach { poseLandmarks in
            var personLandmarks: [LandmarkRecord] = []
            
            // 각 관절(Landmark)을 순회합니다.
            poseLandmarks.normalizedLandmarks.forEach { normalizedLandmark in
                personLandmarks.append(LandmarkRecord(
                    x: Double(normalizedLandmark.x),
                    y: Double(normalizedLandmark.y),
                    z: Double(normalizedLandmark.z),
                    visibility: Double(normalizedLandmark.visibility ?? 0.0) // 가시성이 없을 경우 0.0
                ))
            }
            allLandmarks.append(personLandmarks)
        }
        
        poseResult.landmarks = allLandmarks
        return poseResult
    }
}