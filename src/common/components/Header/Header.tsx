import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Button from "@mui/material/Button"
import { ButtonSwitchTheme } from "common/components"
import React from "react"
import { StyledAppBar, StyledLink } from "./Header.styled"
import LinearProgress from "@mui/material/LinearProgress"
import { useAppSelector } from "common/hooks"
import { selectStatus } from "app/model/appSelectors"
import { Path } from "common/routing"

export const Header = () => {
  const status = useAppSelector(selectStatus)

  return (
    <StyledAppBar>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <StyledLink to={Path.Login}>Login</StyledLink>
            <Button color="inherit">Logout</Button>
            <Button color="inherit">Faq</Button>
            <ButtonSwitchTheme />
          </div>
        </Toolbar>
        {status === "loading" && <LinearProgress sx={{ height: 3 }} color="inherit" />}
      </AppBar>
    </StyledAppBar>
  )
}
