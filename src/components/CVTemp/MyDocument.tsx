import { PropsWithChildren } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font, Image } from '@react-pdf/renderer';
import { FormValues } from '../CVForm';
import LXGWFasmartGothic from '@/assets/font/LXGWFasmartGothic.ttf';
import avatar from '@/assets/images/avatar.png';
import BWText from './BWText';
import { format } from 'date-fns';

Font.register({ family: 'LXGWFasmartGothic', src: LXGWFasmartGothic });

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'LXGWFasmartGothic',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
});

// Create Document Component

const MyDocument = (props: PropsWithChildren<{ cvData: FormValues }>) => {
  const { cvData } = props;
  const { name, job, jobAddress, phone, email, birthday, weChat } = cvData;
  return (
    <PDFViewer className='w-full h-screen'>
      <Document title='前端工程师'>
        <Page size='A4' style={[styles.page]}>
          <View style={{ borderTop: '2px solid #ca3a08', color: '#1e293b', paddingHorizontal: 16, paddingVertical: 24 }}>
            <View style={{ flexDirection: 'row', columnGap: 20, marginBottom: 30 }}>
              <View style={{ flex: 2, rowGap: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 12 }}>
                  <Image style={{ width: 50, height: 50, borderRadius: '50% ' }} src={avatar} />
                  <View style={{ rowGap: 8 }}>
                    <Text style={{ fontWeight: 600 }}>{name}</Text>
                    <Text style={{ color: '#ca3a08', fontSize: 12 }}>{job}</Text>
                  </View>
                </View>
                <BWText
                  style={{ fontSize: 16 }}
                  text='五年前端开发经验，三年大厂任职经验，对React以及周边生态系统有比较深入的了解，拥有丰富的实战经验，对前端开发领域拥有极大的热情与兴趣。'
                />
              </View>
              <View style={{ flex: 1, rowGap: 8 }}>
                <Text>{jobAddress}</Text>
                <Text>{email}</Text>
                <Text>{phone}</Text>
                <Text>{format(birthday, 'yyyy-MM-dd')}</Text>
                <Text>{weChat}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', columnGap: 20 }}>
              <View style={{ flex: 2, paddingTop: 30, borderTop: '1px solid #cbd5e1' }}></View>
              <View style={{ flex: 1, paddingTop: 30, borderTop: '1px solid #cbd5e1' }}></View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default MyDocument;
