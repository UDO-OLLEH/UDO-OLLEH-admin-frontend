import {
  Box,
  Button,
  Container,
  CardContent,
  Card,
  Stack,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  createTheme,
  ThemeProvider,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { useParams } from "react-router-dom";
import Api from "../api/Api";
import MenuList from "../component/menu/MenuList";
const MenuPage = (props: any) => {
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
  const params = useParams();

  const [restaurantId, setRestaurantId] = useState("");
  const [menuName, setMenuName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const onSetMenuName = (e: any) => {
    setMenuName(e.target.value);
  };
  const onSetPrice = (e: any) => {
    setPrice(e.target.value);
  };
  const onSetDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const [files, setFiles] = useState<FileList>();
  const [fileName, setFileName] = useState("");
  const [Base64s, setBase64s] = useState<{ image: File; url: any }[]>([]);

  const [type, setType] = useState("TITLE");
  const onSetType = (e: SelectChangeEvent) => {
    setType(e.target.value as string);
  };
  const encodeFileToBase64 = (image: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (event: any) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const formData = new FormData();
  const onUploadFile = (e: any) => {
    
    formData.append("file", e.target.files[0]);
    setFileName(e.target.files[0].name);
    console.log(e.target.files[0]);

    setBase64s([]);
    Array.from(e.target.files).forEach((image: any) => {
      encodeFileToBase64(image).then((data) =>
        setBase64s((prev) => [...prev, { image: image, url: data }])
      );
    });
  };

  const postData = useCallback(async () => {
    const result = await new Api().postData(
      "http://ec2-54-241-190-224.us-west-1.compute.amazonaws.com/restaurant/menu",
    
      {
        restaurantId: params.id,
        name: menuName,
        price: price,
        description: description,
      }
    );
  }, []);

  useEffect(() => {}, [fileName]);

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
                mb: 3,
              }}
            >
              <Typography sx={{ m: 1 }} variant="h4">
                맛집 상세
              </Typography>
              ={" "}
            </Box>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                m: -1,
              }}
            >
              <Typography sx={{ m: 1 }} variant="h5">
                메뉴 등록
              </Typography>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Button variant="contained" component="label">
                        파일 선택
                        <input
                          hidden
                          accept="image/*"
                          multiple
                          type="file"
                          onChange={onUploadFile}
                        />
                      </Button>
                    </Stack>
                    <Typography sx={{ m: 1 }} variant="h5">
                      file : {fileName}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexWrap: "wrap",
                      m: -1,
                      mb: 3,
                    }}
                  >
                    <TextField
                      sx={{ width: "30ch", ml: 3 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon color="action" fontSize="small"></SvgIcon>
                          </InputAdornment>
                        ),
                      }}
                      placeholder="맛집 아이디"
                      variant="outlined"
                    >
                      {params.id}
                    </TextField>
                    <TextField
                      sx={{ width: "30ch", ml: 3 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon color="action" fontSize="small"></SvgIcon>
                          </InputAdornment>
                        ),
                      }}
                      placeholder="메뉴 이름"
                      variant="outlined"
                      onChange={onSetMenuName}
                    />
                    <TextField
                      sx={{ width: "30ch", ml: 3 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon color="action" fontSize="small"></SvgIcon>
                          </InputAdornment>
                        ),
                      }}
                      placeholder="메뉴 가격"
                      variant="outlined"
                      type="number"
                      onChange={onSetPrice}
                    />
                  </Box>
                  <Box>
                    <TextField
                      sx={{ width: "50ch", ml: 3 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon color="action" fontSize="small"></SvgIcon>
                          </InputAdornment>
                        ),
                      }}
                      placeholder="메뉴 설명"
                      variant="outlined"
                      onChange={onSetDescription}
                    />
                    <Button variant="contained" sx={{ ml: 2 }}>
                      등록
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <MenuList id={params.id}></MenuList>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default MenuPage;
