import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { useAppSelector } from "common/hooks"
import { selectThemeMode } from "app/model/appSelectors"
import { getTheme } from "common/lib/theme"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import styled from "styled-components"

//react hook form это настраиваемый хук для удобного управления формами.

// Он принимает один объект в качестве необязательного аргумента.

type Inputs = {
  email: string
  password: string
  rememberMe: boolean
}

const defaultFormValues = {
  email: "",
  password: "",
  rememberMe: false,
}

export const Login = () => {
  const {
    register, // {...register("name-input")} в внутри <div тут>, для регистрации ввода в объект
    handleSubmit, // - эта функция получит данные формы, если валидация формы пройдет успешно
    // watch, // - функция отслеживает ввод в определенном поле или всей формы
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: defaultFormValues }) //зачем тут def value
  //todo: Поправить defValue
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    reset()
  }

  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <Grid container justifyContent={"center"}>
      <Grid justifyContent={"center"}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                href={"https://social-network.samuraijs.com/"}
                target={"_blank"}
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Incorrect email address",
                  },
                })}
              />
              {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
              <TextField type="password" label="Password" margin="normal" {...register("password")} />
              <FormControlLabel
                label={"Remember me"}
                control={
                  // Подробнее о тома как работает
                  <Controller
                    name={"rememberMe"}
                    control={control}
                    // render={({ field: { value, ...rest } }) => <Checkbox {...rest} checked={value} />}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox onChange={(e) => onChange(e.target.checked)} checked={value} />
                    )}
                  />
                }
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`