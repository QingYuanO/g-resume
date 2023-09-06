/* eslint-disable jsx-a11y/alt-text */
import React, { PropsWithChildren } from "react";
import ReactPDF, {
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
import globalStyles, { textStyles } from "./styles";
import { FormValues } from "../CVForm";

const styles = StyleSheet.create({});

const primaryColor = "#1e293b";
const secondaryColor = "#475569";
const grayColor = "#9ca3af";
const lightColor = "#ca3a08";

const T1 = ({ resume }: { resume: FormValues }) => {
  const {
    avatar,
    name,
    job,
    jobAddress,
    phone,
    email,
    certificate,
    hobby,
    introduce,
    customUrls,
    workExperience,
    skills,
    education,
  } = resume;

  return (
    <Document title={job}>
      <Page
        size={[780, 960]}
        style={[
          globalStyles.page,
          {
            backgroundColor: "#f6f8fa",
            color: primaryColor,
          },
        ]}
      >
        <View
          style={{
            borderTop: `2px solid ${lightColor}`,
            color: "#1e293b",
            paddingHorizontal: 24,
            paddingVertical: 24,
            rowGap: 14,
          }}
        >
          <View style={{ flexDirection: "row", columnGap: 30 }}>
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
                    source={new Buffer(avatar, "base64")}
                  />
                )}

                <View style={{ rowGap: 8 }}>
                  <Text style={{ fontWeight: 800, ...textStyles.lg }}>
                    {name}
                  </Text>
                  <Text style={{ color: lightColor }}>{job}</Text>
                </View>
              </View>
              <BWText style={textStyles.lg} text={introduce} />
            </View>
            <View style={{ flex: 1, rowGap: 4 }}>
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
          <View style={{ flexDirection: "row", columnGap: 30 }}>
            <Section
              title="工作经历"
              style={{
                flex: 2,
                paddingTop: 14,
                borderTop: "1px solid #cbd5e1",
                rowGap: 14,
              }}
            >
              {workExperience?.map((item, idx) => {
                const rangeTimeNode = (
                  <View style={{ flex: 0.8, rowGap: 12 }}>
                    <View
                      style={{
                        height: 3,
                        backgroundColor: lightColor,
                        top: 5,
                        position: "relative",
                      }}
                    ></View>
                    <Text style={{ color: grayColor, lineHeight: 1.5 }}>
                      {item.rangeDate}
                    </Text>
                  </View>
                );
                const companyNode = (
                  <View
                    style={{
                      color: grayColor,
                      // ...textStyles.lg,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>{item.company}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 4,
                      }}
                    >
                      <ResumePDFIcon
                        type="location"
                        isPDF
                        style={{ fill: grayColor }}
                      />
                      <Text>{item.position}</Text>
                    </View>
                  </View>
                );
                return (
                  <View
                    style={[{ flexDirection: "row", columnGap: 10 }]}
                    key={idx}
                    wrap={false}
                  >
                    {rangeTimeNode}
                    <View style={{ flex: 4.2, rowGap: 4 }}>
                      <BWText
                        style={{
                          color: lightColor,
                          fontWeight: 600,
                        }}
                        text={item.jobName}
                      />
                      {companyNode}
                      {item.projects.map((project, idx) => {
                        const content = project.content?.split("\n").filter(Boolean);
                        return (
                          <View key={idx} style={{ rowGap: 2 }}>
                            <BWText
                              style={{
                                fontWeight: 600,
                                color: secondaryColor,
                              }}
                              text={project.name}
                            />
                            <BWText
                              style={{
                                color: secondaryColor,
                              }}
                              text={project.description}
                            />
                            <ContentList content={content} />
                          </View>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </Section>
            <Section
              style={{
                flex: 1,
                paddingTop: 14,
                borderTop: "1px solid #cbd5e1",
                rowGap: 14,
              }}
            >
              <Section title="专业技能">
                {skills?.map((item, idx) => {
                  const content = item.content?.split("\n").filter(Boolean);
                  return (
                    <View key={idx} style={{ rowGap: 4 }}>
                      <BWText
                        style={{
                          color: lightColor,
                          fontWeight: 600,
                        }}
                        text={item.description}
                      />
                      <ContentList content={content} />
                    </View>
                  );
                })}
              </Section>
              <Section title="教育经历">
                {education?.map((item, idx) => {
                  return (
                    <View key={idx} style={{ rowGap: 4 }}>
                      <BWText
                        style={{
                          color: lightColor,
                          fontWeight: 600,
                        }}
                        text={item.level}
                      />
                      <View style={{}}>
                        <Text style={{ color: grayColor }}>
                          {item.rangeDate}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            columnGap: 2,
                            flexWrap: "wrap",
                            color: grayColor,
                          }}
                        >
                          <Text>{item.school}</Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              columnGap: 2,
                            }}
                          >
                            <ResumePDFIcon
                              type="major"
                              isPDF
                              style={{ fill: grayColor }}
                            />
                            <Text>{item.major}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </Section>
              <Section
                title="爱好"
                contentStyle={{ gap: 8, flexDirection: "row" }}
              >
                {hobby?.map((item, idx) => {
                  return (
                    <View
                      key={idx}
                      style={{
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                        border: `1px solid ${lightColor}`,
                        borderRadius: 4,
                      }}
                    >
                      <BWText
                        style={{
                          color: lightColor,
                        }}
                        text={item}
                      />
                    </View>
                  );
                })}
              </Section>
              <Section
                title="证书"
                contentStyle={{ gap: 8, flexDirection: "row" }}
              >
                {certificate?.map((item, idx) => {
                  return (
                    <View
                      key={idx}
                      style={{
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                        border: `1px solid ${lightColor}`,
                        borderRadius: 4,
                      }}
                    >
                      <BWText
                        style={{
                          color: lightColor,
                        }}
                        text={item}
                      />
                    </View>
                  );
                })}
              </Section>
            </Section>
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
        <Link
          src={url}
          style={{
            alignSelf: "flex-start",
            color: primaryColor,
          }}
        >
          {name}
        </Link>
      ) : (
        <Text>{name}</Text>
      )}
    </View>
  );
};

const ContentList = ({ content }: { content?: string[] }) => {
  if (!content) return null;
  return (
    <View style={{}}>
      {content?.map((c, i) => {
        return (
          <View
            key={i}
            style={{
              flexDirection: "row",
              columnGap: 5,
              alignItems: "flex-start",
            }}
          >
            <View
              style={{
                height: 4,
                width: 4,
                borderRadius: "50%",
                backgroundColor: lightColor,
                position: "relative",
                top: 6,
              }}
            ></View>
            <BWText
              style={{
                color: secondaryColor,
              }}
              text={c}
            />
          </View>
        );
      })}
    </View>
  );
};

const Section = ({
  children,
  style,
  contentStyle,
  title,
}: PropsWithChildren<{
  style?: ReactPDF.TextProps["style"];
  contentStyle?: ReactPDF.TextProps["style"];
  title?: string;
}>) => {
  return (
    <View style={{ rowGap: 10, ...style }} wrap={false}>
      {title && (
        <Text style={[textStyles.lg, { fontWeight: "semibold" }]}>{title}</Text>
      )}
      <View style={{ rowGap: 10, ...contentStyle }}>{children}</View>
    </View>
  );
};
