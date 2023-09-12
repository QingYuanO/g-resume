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
import { WorkExperienceSchemaType } from "@/components/ResumeForm/formSchema";
import Tag from "../Tag";
import IconText from "../IconText";
import ContentList from "../ContentList";

const primaryColor = "#000";
const secondaryColor = "#374151";
const grayColor = "#9ca3af";
const lightColor = "#8ddddc";

const T2 = ({ resume, isPDF = false, type }: ResumePDFType) => {
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
  const { width, height } = RESUME_SETTINGS[type];
  return (
    <Document title={job}>
      <Page
        size={[width, height]}
        style={{
          ...globalStyles.page,
          ...globalStyles.flexCol,
          backgroundColor: "#fff",
          color: primaryColor,
        }}
      >
        <View style={{ ...globalStyles.flexRow, columnGap: 10,height: 80 }}>
          {avatar && (
            <View style={{ width: 80,  }}>
              <ResumePDFImage
                isPDF={isPDF}
                src={avatar}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          )}
          <View
            style={{
              ...globalStyles.flexCol,
              rowGap: 4,
              backgroundColor: lightColor,
              flexGrow: 1,
              justifyContent: "center",
              padding: 16,
            }}
          >
            <Text style={{ ...textStyles.xl, fontWeight: 600 }}>{name}</Text>
            <Text>{job}</Text>
          </View>
        </View>
        <View
          style={{
            color: primaryColor,
            padding: "12px 16px",
            rowGap: 12,
            ...globalStyles.flexCol,
          }}
        >
          <Section
            title="个⼈信息"
            contentStyle={{
              ...globalStyles.flexRow,
              flexWrap: "wrap",
              rowGap: 6,
              columnGap: 10,
              alignItems: "center",
            }}
          >
            <IconText
              name={jobAddress}
              icon="location"
              isPDF={isPDF}
              color={primaryColor}
            />
            <IconText
              name={email}
              icon="email"
              isPDF={isPDF}
              color={primaryColor}
            />
            <IconText
              name={phone}
              icon="phone"
              isPDF={isPDF}
              color={primaryColor}
            />
            {customUrls?.map((item, idx) => {
              return (
                <IconText
                  color={primaryColor}
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
          </Section>
          <Section title="⼯作经历">
            <WorkExperienceList workExperience={workExperience} isPDF={isPDF} />
          </Section>
          <Section title="专业技能">
            {skills?.map((item, idx) => {
              const content = item.content?.split("\n").filter(Boolean);
              return (
                <View
                  key={idx}
                  style={{ ...globalStyles.flexCol, rowGap: 4 }}
                  wrap={false}
                >
                  <BWText
                    style={{
                      fontWeight: 600,
                    }}
                    text={item.description}
                  />
                  <ContentList
                    content={content}
                    dotColor={primaryColor}
                    color={primaryColor}
                  />
                </View>
              );
            })}
          </Section>
          <Section
            title="教育经历"
            contentStyle={{ ...globalStyles.flexRow, columnGap: 10 }}
          >
            {education?.map((item, idx) => {
              return (
                <View
                  key={idx}
                  style={{ ...globalStyles.flexCol, rowGap: 4, width: "45%" }}
                  wrap={false}
                >
                  <View
                    style={{
                      ...globalStyles.flexRow,
                      columnGap: 10,
                      alignItems: "center",
                      fontWeight: 600,
                    }}
                  >
                    <BWText text={item.level} />
                    <Text>{item.school}</Text>
                  </View>

                  <View
                    style={{
                      ...globalStyles.flexRow,
                      columnGap: 6,
                      alignItems: "center",
                      color: grayColor,
                    }}
                  >
                    <ResumePDFIcon
                      type="major"
                      isPDF={isPDF}
                      style={{ fill: grayColor, size: 15 }}
                    />
                    <Text>{item.major}</Text>
                    <Text>{item.rangeDate}</Text>
                  </View>
                </View>
              );
            })}
          </Section>
        </View>
      </Page>
    </Document>
  );
};

export default T2;

const WorkExperienceList = ({
  workExperience,
  isPDF,
}: {
  workExperience: WorkExperienceSchemaType["workExperience"];
  isPDF: boolean;
}) => {
  return workExperience?.map((item, idx) => {
    return (
      <View
        key={idx}
        wrap={false}
        style={{ ...globalStyles.flexCol, rowGap: 6 }}
      >
        <View style={{ ...globalStyles.flexRow, columnGap: 10 }}>
          <BWText
            style={{
              fontWeight: 600,
            }}
            text={item.jobName}
          />
          <BWText
            style={{
              fontWeight: 600,
            }}
            text={item.company}
          />
        </View>
        <View
          style={{
            ...globalStyles.flexRow,
            columnGap: 8,
            color: grayColor,
            alignItems: "center",
          }}
        >
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
          <Text style={{}}>{item.rangeDate}</Text>
        </View>
        <View
          style={{
            ...globalStyles.flexCol,
            rowGap: 10,
          }}
        >
          {item.projects.map((project, idx) => {
            const content = project.content?.split("\n").filter(Boolean);
            return (
              <View key={idx} style={{ ...globalStyles.flexCol, rowGap: 2 }}>
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
                <ContentList
                  content={content}
                  dotColor={primaryColor}
                  color={primaryColor}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  });
};

const Section = ({
  children,
  style,
  contentStyle,
  title,
  wrap = true,
}: PropsWithChildren<{
  style?: ReactPDF.TextProps["style"];
  contentStyle?: ReactPDF.TextProps["style"];
  title?: string;
  wrap?: boolean;
}>) => {
  return (
    <View
      style={{
        rowGap: 10,
        ...globalStyles.flexCol,
        alignItems: "flex-start",
        ...style,
      }}
      wrap={wrap}
    >
      {title && (
        <View
          style={{
            ...globalStyles.flexRow,
            alignItems: "center",
            backgroundColor: primaryColor,
            color: "#fff",
            flexGrow: 0,
            padding: "6px 10px",
          }}
        >
          <Text style={{ fontWeight: 600 }}>{title}</Text>
        </View>
      )}
      <View
        style={{
          rowGap: 10,
          alignSelf: "stretch",
          ...globalStyles.flexCol,
          ...contentStyle,
        }}
      >
        {children}
      </View>
    </View>
  );
};
