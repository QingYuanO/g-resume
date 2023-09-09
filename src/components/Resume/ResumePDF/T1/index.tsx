import React, { PropsWithChildren } from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import globalStyles, { textStyles } from "../styles";
import BWText from "../BWText";
import { ResumePDFIcon, IconType } from "../ResumePDFIcon";
import ResumePDFLink from "../ResumePDFLink";
import { RESUME_SETTINGS } from "@/constant";
import { ResumePDFType } from "..";
import ResumePDFImage from "../ResumePDFImage";

const primaryColor = "#1e293b";
const secondaryColor = "#475569";
const grayColor = "#9ca3af";
const lightColor = "#ca3a08";

const T1 = ({ resume, isPDF = false, type, height }: ResumePDFType) => {
  const { baseInfo, workExperience, skills, education } = resume;
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
  } = baseInfo;
  const { width } = RESUME_SETTINGS[type];
  return (
    <Document title={job}>
      <Page
        size={[width, height]}
        style={{
          ...globalStyles.page,
          ...globalStyles.flexCol,
          backgroundColor: "#f6f8fa",
          color: primaryColor,
        }}
      >
        <View
          style={{
            borderTop: `2px solid ${lightColor}`,
            color: "#1e293b",
            padding: 24,
            rowGap: 14,
            ...globalStyles.flexCol,
          }}
        >
          <View style={{ ...globalStyles.flexRow, columnGap: 30 }}>
            <View style={{ ...globalStyles.flexCol, flex: 2, rowGap: 8 }}>
              <View
                style={{
                  ...globalStyles.flexRow,
                  alignItems: "center",
                  columnGap: 12,
                }}
              >
                {avatar && (
                  <ResumePDFImage
                    isPDF={isPDF}
                    src={avatar}
                    style={{ width: 50, height: 50, borderRadius: "50% " }}
                  />
                )}

                <View style={{ ...globalStyles.flexCol, rowGap: 8 }}>
                  <Text style={{ fontWeight: 800, ...textStyles.lg }}>
                    {name}
                  </Text>
                  <Text style={{ color: lightColor }}>{job}</Text>
                </View>
              </View>
              <BWText style={textStyles.lg} text={introduce} />
            </View>
            <View style={{ ...globalStyles.flexCol, flex: 1, rowGap: 4 }}>
              <UrlItem name={jobAddress} icon="location" isPDF={isPDF} />
              <UrlItem name={email} icon="email" isPDF={isPDF} />
              <UrlItem name={phone} icon="phone" isPDF={isPDF} />
              {customUrls?.map((item, idx) => {
                return (
                  <UrlItem
                    key={idx}
                    url={item.url}
                    name={item.name}
                    isPDF={isPDF}
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
          <View style={{ ...globalStyles.flexRow, columnGap: 30 }}>
            <Section
              title="工作经历"
              style={{
                flex: 2,
                paddingTop: 14,
                borderTop: "1px solid #cbd5e1",
                rowGap: 14,
                ...globalStyles.flexCol,
              }}
            >
              {workExperience?.map((item, idx) => {
                const rangeTimeNode = (
                  <View
                    style={{ ...globalStyles.flexCol, flex: 0.8, rowGap: 12 }}
                  >
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
                      ...globalStyles.flexRowBetween,
                    }}
                  >
                    <Text>{item.company}</Text>
                    <View
                      style={{
                        ...globalStyles.flexRow,
                        alignItems: "center",
                        columnGap: 4,
                      }}
                    >
                      <ResumePDFIcon
                        type="location"
                        isPDF={isPDF}
                        style={{ fill: grayColor }}
                      />
                      <Text>{item.position}</Text>
                    </View>
                  </View>
                );
                return (
                  <View
                    style={{ ...globalStyles.flexRow, columnGap: 10 }}
                    key={idx}
                    wrap={false}
                  >
                    {rangeTimeNode}
                    <View
                      style={{ ...globalStyles.flexCol, flex: 4.2, rowGap: 4 }}
                    >
                      <BWText
                        style={{
                          color: lightColor,
                          fontWeight: 600,
                        }}
                        text={item.jobName}
                      />
                      {companyNode}
                      {item.projects.map((project, idx) => {
                        const content = project.content
                          ?.split("\n")
                          .filter(Boolean);
                        return (
                          <View
                            key={idx}
                            style={{ ...globalStyles.flexCol, rowGap: 2 }}
                          >
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
                ...globalStyles.flexCol,
              }}
            >
              <Section title="专业技能">
                {skills?.map((item, idx) => {
                  const content = item.content?.split("\n").filter(Boolean);
                  return (
                    <View
                      key={idx}
                      style={{ ...globalStyles.flexCol, rowGap: 4 }}
                    >
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
                    <View
                      key={idx}
                      style={{ ...globalStyles.flexCol, rowGap: 4 }}
                    >
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
                            ...globalStyles.flexRow,
                            columnGap: 2,
                            flexWrap: "wrap",
                            color: grayColor,
                          }}
                        >
                          <Text>{item.school}</Text>
                          <View
                            style={{
                              ...globalStyles.flexRow,
                              alignItems: "center",
                              columnGap: 2,
                            }}
                          >
                            <ResumePDFIcon
                              type="major"
                              isPDF={isPDF}
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
                contentStyle={{
                  gap: 8,
                  ...globalStyles.flexRow,
                  flexWrap: "wrap",
                }}
              >
                {hobby?.map((item, idx) => <Tag tag={item} key={idx}/>)}
              </Section>
              <Section
                title="证书"
                contentStyle={{ gap: 8, flexDirection: "row" }}
              >
                {certificate?.map((item, idx) => <Tag tag={item} key={idx}/>)}
              </Section>
            </Section>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default T1;

const UrlItem = (props: {
  name?: string;
  url?: string;
  icon: IconType;
  isPDF?: boolean;
}) => {
  const { name = "-", url, icon, isPDF = false } = props;
  return (
    <View
      style={{ ...globalStyles.flexRow, columnGap: 4, alignItems: "center" }}
    >
      <ResumePDFIcon type={icon} isPDF={isPDF} />
      {url ? (
        <ResumePDFLink
          src={url}
          isPDF={isPDF}
          style={{
            alignSelf: "flex-start",
            color: primaryColor,
          }}
        >
          {name}
        </ResumePDFLink>
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
              ...globalStyles.flexRow,
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
const Tag = ({ tag }: { tag: string }) => {
  return (
    <View
      style={{
        padding: "3pt 8pt",
        border: `1px solid ${lightColor}`,
        borderRadius: 4,
      }}
    >
      <BWText
        style={{
          color: lightColor,
        }}
        text={tag}
      />
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
    <View
      style={{ rowGap: 10, ...globalStyles.flexCol, ...style }}
      wrap={false}
    >
      {title && (
        <Text style={{ ...textStyles.lg, fontWeight: "semibold" }}>
          {title}
        </Text>
      )}
      <View style={{ rowGap: 10, ...globalStyles.flexCol, ...contentStyle }}>
        {children}
      </View>
    </View>
  );
};
