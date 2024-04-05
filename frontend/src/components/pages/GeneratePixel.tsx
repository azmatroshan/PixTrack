import {
  TextInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Modal,
} from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PixelDetailsModal from "../fragments/PixelDetailsModal";
import { generatePixel } from "../../services/UserService";
import { API_URL } from "../../common/Constants";

export default function GeneratePixel() {
  const [successful, setSuccessful] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [pixelId, setPixelId] = useState<string>();

  const form = useForm({
    initialValues: {
      subject: "",
    },
  });

  const handleRegister = (formValue: any) => {
    setSuccessful(false);
    generatePixel(formValue.subject).then(
      (response: any) => {
        setSuccessful(true);
        setPixelId(response.data.pixelId);
      },
      (error: any) => {}
    );
    open();
  };

  const { user: currentUser } = useSelector((state: any) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Container size={420} my={40}>
      {
        <>
          <Modal opened={opened} onClose={close} title="Pixel Details" centered>
            <PixelDetailsModal
              data={{
                imageUrl: `${API_URL}track/${pixelId}`,
                html: `<img src="${API_URL}track/${pixelId}" alt="pixel" />`,
              }}
            />
          </Modal>
          <Title
            align="center"
            sx={(theme) => ({
              fontWeight: 900,
            })}
          >
            Generate New Pixel
          </Title>
        </>
      }

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {!successful && (
          <form onSubmit={form.onSubmit(handleRegister)} autoComplete="off">
            <TextInput
              label="Email Subject"
              placeholder="Application for Summer Internship 2022"
              required
              {...form.getInputProps("subject")}
            />
            <Button fullWidth mt="xl" type="submit">
              Generate Pixel
            </Button>
          </form>
        )}
        {successful && (
          <>
            <Text>Pixel Generated Successfully!</Text>
          </>
        )}
      </Paper>
    </Container>
  );
}
