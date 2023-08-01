import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        margin: "1rem",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        border: "1px solid rgba(100, 100, 111, 0.2)",
        typography: "body1",
        borderRadius: "10px",
        mb: "10rem",
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#F4F6F8" }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{ fontSize: "12px" }} label="Description" value="1" />
            <Tab sx={{ fontSize: "12px" }} label="Review(4)" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          Просто текст Просто текст Просто текст Просто текст Просто текст
          Просто текст Просто текст Просто текст Просто текст Просто текст
          Просто текст Просто текст Просто текст Просто текст Просто текст
          Просто текст Просто текст Просто текст Просто текст Просто текст
          Просто текст Просто текст Просто текст Просто текст Просто текст
          Просто текст Просто текст Просто текст Просто текст Просто текст
          Просто текст Просто текст Просто текст Просто текст Просто текст
          Просто текст Просто текст Просто текст
        </TabPanel>
        <TabPanel value="2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum animi
          quasi nam non, et ad deleniti vitae itaque fugit laudantium. Iure
          consequatur saepe quaerat expedita? Voluptatibus accusamus nihil
          deleniti? Blanditiis!
        </TabPanel>
      </TabContext>
    </Box>
  );
}
