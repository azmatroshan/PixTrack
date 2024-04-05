import {
  Table,
  ScrollArea,
  Menu,
  Button,
  Loader,
  Center,
  Pagination,
  TextInput,
  Container,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  IconProgressCheck,
  IconSearch,
  IconSettingsBolt,
  IconTrash,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useDebouncedValue } from "@mantine/hooks";
import { deletePixel, getAllPixels } from "../../services/UserService";

export default function Pixels() {
  const [pixels, setPixels] = useState([
    {
      subject: "",
      _id: "",
      createdAt: "",
    },
  ]);

  const [stateUpdate, setStateUpdate] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 1000, { leading: true });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPixels, setTotalPixels] = useState(0);

  const handleSearchChange = (event: any) => {
    setSearch(event.currentTarget.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleDelete = (pixelId: string) => {
    deletePixel({ pixelId }).then(
      (response: any) => {
        setStateUpdate(!stateUpdate);
      },
      (error: any) => {
        if (error) {
        }
      }
    );
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllPixels({
      page: currentPage,
      limit: 10,
      search: debouncedSearch,
    }).then(
      (response) => {
        setPixels(response.data.pixels);
        setTotalPixels(response.data.total);
        setIsLoading(false);
      },
      (error) => {
        if (error) {
        }
        setIsLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, stateUpdate, debouncedSearch]);

  const rows = pixels.map((item) => (
    <tr key={item._id}>
      <td>{item.subject}</td>
      <td>{moment(item.createdAt).utcOffset("+5:30").format("DD-MM-YYYY")}</td>
      <td>
        <Menu
          transitionProps={{ transition: "pop" }}
          withArrow
          position="bottom-end"
          withinPortal
        >
          <Menu.Target>
            <Button
              variant="light"
              color="yellow"
              compact
              leftIcon={<IconSettingsBolt size="1rem" stroke={1.5} />}
            >
              Actions
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              component={Link}
              to={`/stats/${item._id}`}
              icon={<IconProgressCheck size="1rem" stroke={1.5} />}
            >
              View Stats
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                handleDelete(item._id);
              }}
              icon={<IconTrash size="1rem" stroke={1.5} />}
              color="red"
            >
              Delete Pixel
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  ));

  const { user: currentUser } = useSelector((state: any) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {isLoading ? ( // Conditional rendering based on the loading status
        <Center>
          <Loader variant="bars" />
        </Center>
      ) : (
        <>
          <Container>
            <ScrollArea>
              <Title
                mb="50px"
                align="center"
                sx={(theme) => ({
                  fontWeight: 900,
                })}
              >
                Pixels
              </Title>
              <TextInput
                placeholder={"Search by any field"}
                mb="md"
                icon={<IconSearch size="0.9rem" stroke={1.5} />}
                value={search}
                onChange={handleSearchChange}
              />
              <Table miw={800} verticalSpacing="sm">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Created At</th>
                    <th>Stats</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </ScrollArea>
            <Center>
              <Pagination
                mb="100px"
                value={currentPage}
                onChange={handlePageChange}
                pt={40}
                total={Math.ceil(totalPixels / 10)}
                color="yellow"
                withEdges
              />
            </Center>
          </Container>
        </>
      )}
    </>
  );
}
