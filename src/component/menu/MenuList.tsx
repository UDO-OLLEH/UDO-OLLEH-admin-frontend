import {
  Box,
  Button,
  Container,
  Typography,
  createTheme,
  ThemeProvider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import Api from "../../api/Api";
import { useParams } from "react-router-dom";

const MenuList = (props: any) => {
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
  interface MenuType {
    name: string;
    photo: string;
    price: number;
    description: string;
  }

  const [menuList, setMenuList] = useState<MenuType[]>([]);
  const [lastIdx, setLastIdx] = useState(0);
  const bringData = useCallback(async () => {
    const response = await new Api().getData(
      `http://ec2-54-241-190-224.us-west-1.compute.amazonaws.com/restaurant/${props.id}/menu`,
      {}
    );

    console.log(response);
    const _menus = await response.list.map(
      (menu: any) => (
        setLastIdx(lastIdx + 1),
        {
          name: menu.name,
          photo: menu.photo,
          price: menu.price,
          description: menu.description,
        }
      )
    );
    setMenuList(menuList.concat(_menus));
  }, []);
  const onDelete = (name: any) => {
    const confirm = window.confirm("삭제하시겠습니까?");
    if (confirm === true) {
      deleteData(name);
      window.alert("삭제되었습니다.");
    }
  };

  const deleteData = useCallback(async (name: any) => {
    const response = await new Api().deleteData(
      `http://ec2-54-241-190-224.us-west-1.compute.amazonaws.com/admin/restaurant/${props.id}/menu/${name}`
    );

    console.log(response);
  }, []);

  useEffect(() => {
    bringData();
  }, [menuList]);

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
                  등록된 메뉴
                </Typography>
              </Box>
              <Container maxWidth={false}>
                <Box sx={{ minWidth: 1050 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>이름</TableCell>
                        <TableCell>사진</TableCell>
                        <TableCell>가격</TableCell>
                        <TableCell>설명</TableCell>
                        <TableCell>비고</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {menuList.map((menu: any) => (
                        <TableRow key={menu.name}>
                          <TableCell>{menu.name}</TableCell>
                          <TableCell>
                            <img src={`${menu.photo}`} />
                          </TableCell>
                          <TableCell>{menu.price}</TableCell>
                          <TableCell>{menu.description}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              onClick={() => onDelete(menu.name)}
                            >
                              삭제
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Container>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default MenuList;
