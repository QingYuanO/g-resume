import React, { PropsWithChildren } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
import { FormValues } from '../CVForm';
import LXGWFasmartGothic from '@/assets/font/LXGWFasmartGothic.ttf';

Font.register({ family: 'LXGWFasmartGothic', src: LXGWFasmartGothic });

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'LXGWFasmartGothic',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 16,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component

const MyDocument = (props: PropsWithChildren<{ cvData: FormValues }>) => {
  const { cvData } = props;
  const { name } = cvData;
  return (
    <PDFViewer className='w-full h-screen'>
      <Document title='前端工程师'>
        <Page size='A4' style={styles.page}>
          <View style={styles.section}>
            <Text>{name}</Text>
          </View>
          <View style={styles.section}>
            <Text>你好</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default MyDocument;
