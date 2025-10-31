package expo.modules.posedetectionmodule

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL

// 1. JS로 전달할 랜드마크 하나의 데이터 구조를 정의합니다.
// Expo Modules API에서는 'Record'를 사용하여 타입 안전성을 높입니다.
class LandmarkRecord : Record {
    @Field
    val x: Double = 0.0
    @Field
    val y: Double = 0.0
    @Field
    val z: Double = 0.0
    @Field
    val visibility: Double = 0.0
}

// 2. JS로 전달할 최종 결과 데이터 구조를 정의합니다.
class PoseResultRecord : Record {
    @Field
    val landmarks: List<List<LandmarkRecord>> = emptyList() // 감지된 사람(List) -> 각 관절(List)
}

class PoseDetectionModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.

  private val landmarker: PoseLandmarker by lazy { initializePoseLandmarker(appContext.reactContext) }

// 3. PoseLandmarker Task를 초기화합니다. (Lazy Loading)
    private fun initializePoseLandmarker(context: Context?): PoseLandmarker {
        // assets 폴더의 모델 파일 이름 (이 파일은 android/src/main/assets/ 에 있어야 함)
        val modelFileName = "pose_landmarker_full.task"
        
        val options = PoseLandmarkerOptions.builder()
            .setBaseOptions(
                BaseOptions.builder()
                    // 모델을 assets에서 로드하도록 지정합니다.
                    .setModelAssetPath(modelFileName) 
                    .build()
            )
            .setRunningMode(RunningMode.IMAGE) // 정지 이미지 모드
            .setNumPoses(1) 
            .build()
        
        // Context는 ExpoModule의 appContext.reactContext를 사용합니다.
        return PoseLandmarker.createFromOptions(context!!, options)
    }

  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('PoseDetectionModule')` in JavaScript.
    Name("PoseDetectionModule")

    // 4. JS에서 호출할 함수를 정의합니다. (MediaLibraryViewController 역할 일부)
        Function("detectPoseFromFile") { path: String ->
            val context = appContext.reactContext ?: throw IllegalStateException("Context is null")
            
            // 4-1. 파일 경로 (URI)에서 비트맵(Bitmap) 이미지 로드
            val imageUri = Uri.parse(path)
            val bitmap = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                // Android 9 (Pie) 이상
                ImageDecoder.decodeBitmap(ImageDecoder.createSource(context.contentResolver, imageUri))
            } else {
                // 하위 버전
                MediaStore.Images.Media.getBitmap(context.contentResolver, imageUri)
            }
            
            // 4-2. MediaPipe의 이미지 형식(MPImage)으로 변환
            val mpImage = BitmapImageBuilder(bitmap).build()

            // 4-3. 추론 실행 (PoseLandmarkerService 역할)
            val result = landmarker.detect(mpImage)

            // 4-4. 결과를 JS Record 형식으로 변환하여 반환
            return@Function result.toJSObject()
        }
    }

      // 5. PoseLandmarkerResult 객체를 JS의 Record 형식으로 변환하는 확장 함수 (유틸리티)
  private fun PoseLandmarkerResult.toJSObject(): PoseResultRecord {
      val result = PoseResultRecord()
      
      // 랜드마크 데이터를 List<List<LandmarkRecord>> 구조로 변환
      val allLandmarks = mutableListOf<List<LandmarkRecord>>()
      
      this.landmarks().forEach { poseLandmarks ->
          val personLandmarks = mutableListOf<LandmarkRecord>()
          poseLandmarks.forEach { landmark ->
              personLandmarks.add(LandmarkRecord().apply {
                  x = landmark.x().toDouble()
                  y = landmark.y().toDouble()
                  z = landmark.z().toDouble()
                  visibility = landmark.visibility().toDouble()
              })
          }
          allLandmarks.add(personLandmarks)
      }
      
      result.landmarks = allLandmarks
      return result
  }
}
