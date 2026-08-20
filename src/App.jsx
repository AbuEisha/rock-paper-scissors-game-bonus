import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import "./App.css";

import logoIcon from "./assets/images/logo-bonus.svg";
import pentagonBg from "./assets/images/bg-pentagon.svg";
import scissorsIcon from "./assets/images/icon-scissors.svg";
import spockIcon from "./assets/images/icon-spock.svg";
import paperIcon from "./assets/images/icon-paper.svg";
import lizardIcon from "./assets/images/icon-lizard.svg";
import rockIcon from "./assets/images/icon-rock.svg";
import RulesDialog from "./RulesDialog";

const gameChoices = [
  {
    name: "Scissors",
    icon: scissorsIcon,
    borderColor: "hsl(39, 89%, 49%)",
    shadowColor: "hsl(28, 76%, 44%)",
  },
  {
    name: "Spock",
    icon: spockIcon,
    borderColor: "hsl(189, 59%, 53%)",
    shadowColor: "hsl(194, 58%, 42%)",
  },
  {
    name: "Paper",
    icon: paperIcon,
    borderColor: "hsl(230, 89%, 62%)",
    shadowColor: "hsl(229, 64%, 46%)",
  },
  {
    name: "Lizard",
    icon: lizardIcon,
    borderColor: "hsl(261, 73%, 60%)",
    shadowColor: "hsl(261, 51%, 44%)",
  },

  {
    name: "Rock",
    icon: rockIcon,
    borderColor: "hsl(349, 71%, 52%)",
    shadowColor: "hsl(347, 75%, 35%)",
  },
];

function App() {
  const [gameInfo, setGameInfo] = useState({
    you: null,
    house: null,
    score: 0,
    msg: null,
  });

  const [openRulesDialog, setOpenRulesDialog] = useState(false);

  useEffect(() => {
    const getScore = () => {
      setGameInfo((prev) => ({
        ...prev,
        score: JSON.parse(localStorage.getItem("gameScore")) || 0,
      }));
    };

    getScore();
  }, []);

  const handleStartGame = (youPicked) => {
    const rules = {
      scissors: ["paper", "lizard"],
      paper: ["rock", "spock"],
      rock: ["scissors", "lizard"],
      spock: ["scissors", "rock"],
      lizard: ["paper", "spock"],
    };

    setGameInfo((prev) => ({ ...prev, you: youPicked }));

    let housePicked;
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * gameChoices.length);
      housePicked = gameChoices[randomIndex].name;
      setGameInfo((prev) => ({
        ...prev,
        house: housePicked,
      }));
    }, 2000);

    setTimeout(() => {
      let score = gameInfo.score;
      if (youPicked === housePicked) {
        setGameInfo((prev) => ({ ...prev, msg: "Draw!" }));
      } else if (
        rules[youPicked.toLowerCase()].includes(housePicked.toLowerCase())
      ) {
        score = gameInfo.score + 1;
        setGameInfo((prev) => ({
          ...prev,
          msg: "You Win",
          score: score,
        }));
      } else {
        score = gameInfo.score - 1;
        setGameInfo((prev) => ({
          ...prev,
          msg: "You Lose",
          score: score,
        }));
      }
      localStorage.setItem("gameScore", JSON.stringify(score));
    }, 3000);
  };

  const handleRestartGame = () => {
    setGameInfo((prev) => ({ ...prev, you: null, house: null, msg: null }));
  };

  const handleToggleRulesDialog = () => {
    setOpenRulesDialog((prev) => !prev);
  };
  return (
    <Box
      component="main"
      sx={{
        paddingBlock: { xs: "2rem 56px", sm: "2rem", md: "3rem 2rem" },
        height: { xs: "750px", sm: "768px" },
        position: "relative",
      }}
    >
      <Stack
        sx={{
          position: "relative",
          zIndex: 4,
          marginInline: { xs: "1.75rem", md: "auto" },
          maxWidth: { xs: "100%", md: "702px" },
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: { xs: "12px 12px 12px 20px", sm: "16px 20px" },
          border: "3px solid",
          borderColor: "divider",
          borderRadius: { xs: "8px", sm: "16px" },
        }}
      >
        <Box
          component="img"
          src={logoIcon}
          alt="Logo Icon"
          sx={{ display: "block", width: { xs: "55px", sm: "auto" } }}
        />
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: "6px", sm: "12px" },
            width: { xs: "80px", sm: "150px" },
            height: { xs: "72px", sm: "114px" },
            backgroundColor: "white",
            borderRadius: { xs: "6px", sm: "8px" },
          }}
        >
          <Typography
            variant="button"
            sx={{
              fontSize: { xs: "10px", sm: "14px" },
              letterSpacing: { xs: "2px", sm: "3px" },
              fontWeight: 600,
              lineHeight: 0.75,
              color: "text.secondary",
            }}
          >
            Score
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "4rem" },
              fontWeight: 700,
              lineHeight: 0.75,
              color: "text.primary",
            }}
          >
            {gameInfo.score}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        sx={{
          justifyContent: "space-between",
          height: { xs: "calc(100% - 102px)", sm: "calc(100% - 152px)" },
        }}
      >
        {!gameInfo.you && (
          <Box
            sx={{
              maxWidth: { xs: "400px", sm: "472px" },
              paddingInline: { xs: "2rem", sm: 0 },
              marginInline: "auto",
              position: "relative",
              marginBlockStart: { xs: "5.75rem", sm: "46px" },
            }}
          >
            <Box
              component="img"
              src={pentagonBg}
              alt="Pentagon Background"
              sx={{
                position: "absolute",
                width: { xs: "224px", sm: "auto" },
                display: "block",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <Grid
              container
              rowSpacing={{ xs: "30px", sm: "45px" }}
              columnSpacing={{ xs: "2rem", sm: "52px" }}
            >
              {gameChoices.map((choice) => (
                <Grid
                  key={choice.name}
                  size={choice.name === "Scissors" ? 12 : 6}
                  sx={{
                    textAlign:
                      choice.name === "Scissors"
                        ? "center"
                        : choice.name === "Spock" || choice.name === "Rock"
                          ? "start"
                          : "end",
                  }}
                >
                  <IconButton
                    disableRipple
                    aria-label={`Choose ${choice.name}`}
                    onClick={() => handleStartGame(choice.name)}
                    sx={{
                      marginBlockStart:
                        choice.name === "Spock" || choice.name === "Paper"
                          ? { xs: "-40px", sm: "-60px" }
                          : 0,
                      padding: 0,
                      borderWidth: { xs: "11px", sm: "16px" },
                      borderStyle: "solid",
                      borderColor: choice.borderColor,
                      boxShadow: {
                        xs: `0px 4px 0px ${choice.shadowColor}, 0px 4px 3px black`,
                        sm: `0px 7px 0px ${choice.shadowColor}, 0px 7px 3px black`,
                      },
                    }}
                  >
                    <Stack
                      component="span"
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: { xs: "74px", sm: "110px" },
                        height: { xs: "74px", sm: "110px" },
                        borderRadius: "50%",
                        backgroundColor: "white",
                        boxShadow: {
                          xs: "inset 0px 4px 0px hsl(229deg 25% 31% / 22%)",
                          sm: "inset 0px 6px 0px hsl(229deg 25% 31% / 22%)",
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={choice.icon}
                        alt={`${choice.name} Icon`}
                        sx={{
                          display: "block",
                          width: { xs: "34px", sm: "auto" },
                        }}
                      />
                    </Stack>
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {gameInfo.you && (
          <Stack
            sx={{
              flexDirection: "row",
              flexWrap: { xs: "wrap", md: "nowrap" },
              justifyContent: "center",
              marginInline: "auto",
              marginBlockStart: {
                xs: "6rem",
                sm: "5rem",
              },
              gap: { xs: "80px 3.25rem", sm: "2rem 4.5rem", md: 0 },
            }}
          >
            <Stack
              sx={{
                alignItems: "center",
                gap: { xs: "2.25rem", md: "4.25rem" },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  position: "relative",
                  zIndex: 4,
                  order: { xs: 2, sm: 1 },
                  fontSize: { xs: "14px", sm: "1.5rem" },
                  fontWeight: 600,
                  color: "white",
                  lineHeight: 0.75,
                  letterSpacing: { xs: "2px", sm: "3px" },
                  textTransform: "uppercase",
                }}
              >
                You Picked
              </Typography>
              <Box
                sx={{
                  order: { xs: 1, sm: 2 },
                  borderRadius: "50%",
                  boxShadow:
                    gameInfo.msg === "You Win"
                      ? {
                          xs: "0px 3px 0px 20px hsl(246deg 11% 37% / 15%),0px 3px 0px 48px hsl(246deg 11% 37% / 14%),0px 3px 0px 80px hsl(246deg 11% 37% / 15%)",
                          sm: "0px 5px 0px 50px hsl(246deg 11% 37% / 15%), 0px 5px 0px 90px hsl(246deg 11% 37% / 14%), 0px 5px 0px 150px hsl(246deg 11% 37% / 15%)",
                          md: "0px 0px 0px 66px hsl(246deg 11% 37% / 15%),0px 5px 0px 136px hsl(246deg 11% 37% / 14%),0px 5px 0px 220px hsl(246deg 11% 37% / 15%)",
                        }
                      : "none",
                }}
              >
                {gameChoices.map(
                  (choice) =>
                    gameInfo.you === choice.name && (
                      <Box
                        key={choice.name}
                        sx={{
                          borderRadius: "50%",
                          borderWidth: { xs: "16px", sm: "24px", md: "34px" },
                          borderStyle: "solid",
                          borderColor: choice.borderColor,
                          boxShadow: {
                            xs: `0px 6px 0px ${choice.shadowColor}, 0px 6px 3px black`,
                            md: `0px 12px 0px ${choice.shadowColor}, 0px 12px 3px black`,
                          },
                        }}
                      >
                        <Stack
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: { xs: "100px", sm: "160px", md: "224px" },
                            height: { xs: "100px", sm: "160px", md: "224px" },
                            borderRadius: "50%",
                            backgroundColor: "white",
                            boxShadow: {
                              xs: "inset 0px 5px 0px hsl(229deg 25% 31% / 22%)",
                              md: "inset 0px 12px 0px hsl(229deg 25% 31% / 22%)",
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={choice.icon}
                            alt={`${choice.name} Icon`}
                            sx={{ display: "block", width: { md: "102px" } }}
                          />
                        </Stack>
                      </Box>
                    ),
                )}
              </Box>
            </Stack>
            {gameInfo.msg && (
              <Stack
                sx={{
                  position: "relative",
                  zIndex: 4,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1.75rem",
                  order: { xs: 3, md: 2 },
                  width: { xs: "100%", md: "auto" },
                  marginInline: { md: "3rem", lg: "4.75rem 3.5rem" },
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "3.5rem",
                    fontWeight: 700,
                    color: "white",
                    lineHeight: 0.75,
                    textTransform: "uppercase",
                  }}
                >
                  {gameInfo.msg}
                </Typography>
                <Button
                  disableRipple
                  onClick={handleRestartGame}
                  sx={{
                    width: "220px",
                    height: "48px",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    color: "text.primary",
                    fontSize: "16px",
                    letterSpacing: "2px",
                    "&:hover": {
                      color: "hsl(349, 71%, 52%)",
                    },
                    "&.Mui-focusVisible": {
                      color: "hsl(349, 71%, 52%)",
                    },
                  }}
                >
                  Play Again
                </Button>
              </Stack>
            )}
            <Stack
              sx={{
                alignItems: "center",
                gap: { xs: "2.25rem", md: "4.25rem" },
                order: { xs: 2, md: 3 },
                marginInlineStart: {
                  md:
                    gameInfo.house && !gameInfo.msg
                      ? "4.5rem"
                      : gameInfo.msg
                        ? 0
                        : "102.2px",
                },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  position: "relative",
                  zIndex: 4,
                  order: { xs: 2, sm: 1 },
                  fontSize: { xs: "14px", sm: "1.5rem" },
                  fontWeight: 600,
                  color: "white",
                  lineHeight: 0.75,
                  letterSpacing: { xs: "2px", sm: "3px" },
                  textTransform: "uppercase",
                }}
              >
                The House Picked
              </Typography>
              <Stack
                sx={{
                  order: { xs: 1, sm: 2 },
                  justifyContent: "center",
                  height: "100%",
                  borderRadius: "50%",
                  boxShadow:
                    gameInfo.msg === "You Lose"
                      ? {
                          xs: "0px 3px 0px 20px hsl(246deg 11% 37% / 15%),0px 3px 0px 48px hsl(246deg 11% 37% / 14%),0px 3px 0px 80px hsl(246deg 11% 37% / 15%)",
                          sm: "0px 5px 0px 50px hsl(246deg 11% 37% / 15%), 0px 5px 0px 90px hsl(246deg 11% 37% / 14%), 0px 5px 0px 150px hsl(246deg 11% 37% / 15%)",
                          md: "0px 0px 0px 66px hsl(246deg 11% 37% / 15%),0px 5px 0px 136px hsl(246deg 11% 37% / 14%),0px 5px 0px 220px hsl(246deg 11% 37% / 15%)",
                        }
                      : "none",
                }}
              >
                {!gameInfo.house && (
                  <Box
                    sx={{
                      width: { xs: "110px", sm: "170px", md: "226px" },
                      height: { xs: "110px", sm: "170px", md: "226px" },
                      borderRadius: "50%",
                      backgroundColor: "hsl(237deg 48% 15% / 30%)",
                    }}
                  ></Box>
                )}
                {gameChoices.map(
                  (choice) =>
                    gameInfo.house === choice.name && (
                      <Box
                        key={choice.name}
                        sx={{
                          borderRadius: "50%",
                          borderWidth: { xs: "16px", sm: "24px", md: "34px" },
                          borderStyle: "solid",
                          borderColor: choice.borderColor,
                          boxShadow: {
                            xs: `0px 6px 0px ${choice.shadowColor}, 0px 6px 3px black`,
                            md: `0px 12px 0px ${choice.shadowColor}, 0px 12px 3px black`,
                          },
                        }}
                      >
                        <Stack
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: { xs: "100px", sm: "160px", md: "224px" },
                            height: { xs: "100px", sm: "160px", md: "224px" },
                            borderRadius: "50%",
                            backgroundColor: "white",
                            boxShadow: {
                              xs: "inset 0px 5px 0px hsl(229deg 25% 31% / 22%)",
                              md: "inset 0px 12px 0px hsl(229deg 25% 31% / 22%)",
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={choice.icon}
                            alt={`${choice.name} Icon`}
                            sx={{ display: "block", width: { md: "102px" } }}
                          />
                        </Stack>
                      </Box>
                    ),
                )}
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
      <Button
        disableRipple
        onClick={handleToggleRulesDialog}
        sx={{
          position: "absolute",
          zIndex: 4,
          bottom: { xs: "56px", sm: "32px" },
          left: { xs: "50%", sm: "auto" },
          right: { sm: "32px" },
          transform: { xs: "translateX(-50%)", sm: "translateX(0)" },
          border: "2px solid",
          borderColor: "divider",
          width: "130px",
          height: "42px",
          color: "white",
          letterSpacing: "3px",
          borderRadius: "8px",
        }}
      >
        Rules
      </Button>
      <RulesDialog
        open={openRulesDialog}
        handleClose={handleToggleRulesDialog}
      />
    </Box>
  );
}

export default App;
