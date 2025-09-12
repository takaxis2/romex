// screens/SettingsScreen.tsx
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SettingsRowProps = {
  icon?: React.ComponentProps<typeof Feather>['name'];
  text: string;
  type?: 'navigate' | 'value' | 'toggle' | 'value-navigate' | 'link';
  value?: any;
  onValueChange?: (value: boolean) => void;
};

// 재사용 가능한 설정 행 컴포넌트
const SettingsRow = ({ icon, text, type = 'navigate', value, onValueChange }: SettingsRowProps) => {
  return (
    <TouchableOpacity style={styles.row} disabled={type !== 'navigate' && type !== 'link'}>
      {icon && <Feather name={icon} size={20} color="#ccc" style={styles.rowIcon} />}
      <Text style={styles.rowText}>{text}</Text>
      <View style={styles.rowRight}>
        {type === 'navigate' && <Feather name="chevron-right" size={20} color="#888" />}
        {type === 'value' && <Text style={styles.rowValue}>{value}</Text>}
        {type === 'toggle' && <Switch trackColor={{ false: '#767577', true: '#4A90E2' }} thumbColor="white" value={value} onValueChange={onValueChange} />}
        {type === 'value-navigate' && (
          <>
            <Text style={styles.rowValue}>{value}</Text>
            <Feather name="chevron-right" size={20} color="#888" style={{marginLeft: 8}} />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function SettingsScreen() {
  const [isMuted, setIsMuted] = useState(false);
  const [noWall, setNoWall] = useState(true);
  const [pip, setPip] = useState(false);
  const router = useRouter();


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.emailText}>t******@gmail.com</Text>

        <TouchableOpacity style={styles.restoreButton}>
          <Text style={styles.restoreButtonText}>Restore purchases</Text>
        </TouchableOpacity>

        <Section title="Connect">
          <SettingsRow text="Smartwatches" />
          <SettingsRow text="Apple Health" />
        </Section>
        
        <Section title="Protocols settings">
          <SettingsRow text="Mute the voice" type="toggle" value={isMuted} onValueChange={setIsMuted} />
          <SettingsRow text="Exercises without wall" type="toggle" value={noWall} onValueChange={setNoWall} />
          <SettingsRow text="Picture in picture" type="toggle" value={pip} onValueChange={setPip}/>
          <SettingsRow text="Save my 4G/5G" type="value-navigate" value="720p" />
        </Section>
        
        <Section title="Account management">
            <SettingsRow text="Language" type="value-navigate" value="English" />
            <SettingsRow text="Change password" />
            <SettingsRow text="My personal data" />
        </Section>

        <Section>
            <SettingsRow text="FAQ" />
            <SettingsRow text="Help" />
        </Section>

        <TouchableOpacity style={styles.signOutButton} onPress={()=>{
            router.dismissAll()
            router.replace('/')}}>
            <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

type SectionProps = {
  title?: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
    <View style={styles.section}>
        {title && <Text style={styles.sectionTitle}>{title}</Text>}
        <View style={styles.sectionBody}>
            {children}
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0D0D0D' },
    emailText: {
        color: '#888',
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 20,
    },
    restoreButton: {
        alignItems: 'center',
        marginBottom: 30,
    },
    restoreButtonText: {
        color: '#4A90E2',
        fontSize: 16,
        fontWeight: '600',
    },
    section: {
        marginHorizontal: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        color: '#aaa',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    sectionBody: {
        backgroundColor: '#1A1A1A',
        borderRadius: 12,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#1A1A1A',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#333',
    },
    rowIcon: {
        marginRight: 16,
    },
    rowText: {
        flex: 1,
        color: 'white',
        fontSize: 16,
    },
    rowRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowValue: {
        color: '#888',
        fontSize: 16,
    },
    signOutButton: {
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 40,
        padding: 16,
        backgroundColor: '#1A1A1A',
        borderRadius: 12,
        alignItems: 'center',
    },
    signOutText: {
        color: '#FF453A', // A standard red color for sign out
        fontSize: 16,
        fontWeight: '600',
    },
});
