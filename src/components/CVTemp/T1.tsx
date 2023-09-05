/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Link,
} from "@react-pdf/renderer";
import BWText from "./BWText";
import { IconType, ResumePDFIcon } from "../PDFIcon";
import globalStyles from "./styles";
import { FormValues } from "../CVForm";

const styles = StyleSheet.create({});

const T1 = ({ resume }: { resume: FormValues }) => {
  const {
    avatar,
    name,
    job,
    jobAddress,
    phone,
    email,
    birthday,
    weChat,
    introduce,
    customUrls,
    workExperience,
    skills,
  } = resume;
  // console.log(workExperience[0].projects[0]?.content?.split("\n"));
  // console.log(skills[0]?.content?.split("\n"));

  return (
    <Document title={job}>
      <Page size="A3" style={[globalStyles.page]}>
        <View
          style={{
            borderTop: "2px solid #ca3a08",
            color: "#1e293b",
            paddingHorizontal: 16,
            paddingVertical: 24,
            rowGap: 30,
          }}
        >
          <View style={{ flexDirection: "row", columnGap: 20 }}>
            <View style={{ flex: 2, rowGap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 12,
                }}
              >
                {avatar && (
                  <Image
                    style={{ width: 50, height: 50, borderRadius: "50% " }}
                    src={avatar}
                    source={new Buffer(avatar,'base64') }
                  />
                )}

                <View style={{ rowGap: 8 }}>
                  <Text style={{ fontWeight: 600 }}>{name}</Text>
                  <Text style={{ color: "#ca3a08", fontSize: 12 }}>{job}</Text>
                </View>
              </View>
              <BWText style={{ fontSize: 16 }} text={introduce} />
            </View>
            <View style={{ flex: 1, rowGap: 8, color: "#1e293b" }}>
              <UrlItem name={jobAddress} icon="location" />
              <UrlItem name={email} icon="email" />
              <UrlItem name={phone} icon="phone" />
              {customUrls?.map((item, idx) => {
                return (
                  <UrlItem
                    key={idx}
                    url={item.url}
                    name={item.name}
                    icon={
                      item.name.toLocaleLowerCase() === "github"
                        ? "url_github"
                        : "url_linkedin"
                    }
                  />
                );
              })}
            </View>
          </View>
          <View style={{ flexDirection: "row", columnGap: 20 }}>
            <View
              style={{
                flex: 2,
                paddingTop: 30,
                borderTop: "1px solid #cbd5e1",
              }}
            ></View>
            <View
              style={{
                flex: 1,
                paddingTop: 30,
                borderTop: "1px solid #cbd5e1",
              }}
            ></View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default T1;

const UrlItem = (props: { name?: string; url?: string; icon: IconType }) => {
  const { name = "-", url, icon } = props;
  return (
    <View style={{ flexDirection: "row", columnGap: 4, alignItems: "center" }}>
      <ResumePDFIcon type={icon} isPDF />
      {url ? (
        <Link src={url} style={{ alignSelf: "flex-start", color: "#1e293b" }}>
          {name}
        </Link>
      ) : (
        <Text>{name}</Text>
      )}
    </View>
  );
};
