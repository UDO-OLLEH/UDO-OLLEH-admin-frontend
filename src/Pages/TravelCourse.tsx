import {
  Box,
  Button,
  Container,
  CardContent,
  Card,
  Grid,
  Pagination,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  createTheme,
  ThemeProvider,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
const TravelCoursePage = () => {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            background: "#7BC8D3",
          },
        },
      },
    },
  });

  const [type, setType] = useState("TITLE");
  const onSetType = (e: SelectChangeEvent) => {
    setType(e.target.value as string);
  };
  useEffect(() => {}, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                m: -1,
              }}
            >
              <Typography sx={{ m: 1 }} variant="h4">
                여행지 상세
              </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <Box>
                    <FormControl sx={{ width: "30ch", ml: 3 }}>
                      <InputLabel id="demo-simple-select-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Type"
                        onChange={onSetType}
                        defaultValue="TITLE"
                      >
                        <MenuItem value="TITLE">제목</MenuItem>
                        <MenuItem value="PHOTO">사진</MenuItem>
                        <MenuItem value="TEXT">텍스트</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      sx={{ width: "30ch", ml: 3 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon color="action" fontSize="small"></SvgIcon>
                          </InputAdornment>
                        ),
                      }}
                      placeholder="내용"
                      variant="outlined"
                    />

                    <Button variant="contained" sx={{ ml: 2 }}>
                      등록
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default TravelCoursePage;
