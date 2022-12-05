import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Container,
  Button,
  Card,
  CardContent,
  Checkbox,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  InputAdornment,
  SvgIcon,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Api from "../api/Api";
import { Link, useNavigate } from "react-router-dom";
import Search from "@mui/icons-material/Search";
import SearchIcon from "@mui/icons-material/Search";
const RestaurantPage = (props: any) => {
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

  const navigate = useNavigate();

  const goDetailPage = (id: any) => {
    navigate("/restaurant/" + id);
  };

  interface RestaurantType {
    id: string;
    name: string;
    placeType: string;
    category: string;
    address: string;
  }
  const [restaurantList, setRestaurantList] = useState<RestaurantType[]>([]);
  const [lastIdx, setLastIdx] = useState(0);
  const [search, setSearch] = useState("");

  const bringData = useCallback(async () => {
    const response = await new Api().getData(
      "http://ec2-54-241-190-224.us-west-1.compute.amazonaws.com/restaurant",
      {}
    );

    const _restaurants = await response.list.map(
      (restaurant: any) => (
        setLastIdx(lastIdx + 1),
        {
          id: restaurant.id,
          name: restaurant.name,
          placeType: restaurant.placeType,
          category: restaurant.category,
          address: restaurant.address,
        }
      )
    );
    console.log(_restaurants);
    setRestaurantList(restaurantList.concat(_restaurants));
  }, []);

  useEffect(() => {
    bringData();
  }, []);
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
            <Box {...props}>
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
                  맛집 리스트
                </Typography>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Card>
                  <CardContent>
                    <Box>
                      {/* <TextField
                        sx={{ width: "50ch" }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SvgIcon
                                color="action"
                                fontSize="small"
                              ></SvgIcon>
                            </InputAdornment>
                          ),
                        }}
                        placeholder="책 제목을 입력하세요."
                        variant="outlined"
                        onChange={onSetSearch}
                      />
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={onSearch}
                        sx={{ ml: 2 }}
                      >
                        <SearchIcon fontSize="large"></SearchIcon>
                      </Button> */}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Container maxWidth={false}>
                {/* <PerfectScrollbar> */}
                <Box sx={{ minWidth: 1050 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>아이디</TableCell>

                        <TableCell>이름</TableCell>
                        <TableCell>종류</TableCell>
                        <TableCell>카테고리</TableCell>
                        <TableCell>주소</TableCell>
                        <TableCell>상세</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {restaurantList.map((restaurant: any) => (
                        <TableRow key={restaurant.id}>
                          <TableCell>{restaurant.id}</TableCell>
                          <TableCell>{restaurant.name}</TableCell>
                          <TableCell>{restaurant.placeType}</TableCell>
                          <TableCell>{restaurant.category}</TableCell>
                          <TableCell>{restaurant.address}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              onClick={() => goDetailPage(restaurant.id)}
                            >
                              상세 보기
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
                {/* </PerfectScrollbar> */}
              </Container>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default RestaurantPage;
