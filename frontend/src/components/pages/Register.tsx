import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { useForm } from "@mantine/form";

export function Register() {
  const navigate = useNavigate();
  const handleRegister = (formValue: {
    username: string;
    password: string;
    email: string;
  }) => {
    const { username, password, email } = formValue;

    AuthService.register(username, email, password).then(
      () => {
        navigate("/pixels");
        window.location.reload();
      },
      (error) => {}
    );
  };

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Anchor size="sm" component="button">
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleRegister)}>
          <TextInput
            label="Username"
            placeholder="johndoe"
            required
            {...form.getInputProps("username")}
          />
          <TextInput
            mt="md"
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
          </Group>
          <Button fullWidth mt="xl">
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
