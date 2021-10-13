import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import BFS from "../PathfinderAlgorithms/BFS";
import { TweenMax, Power3 } from "gsap";
import Mario from "./Mario.png";
// import QuestionBlock from "./QuestionBlock.png";
// import Footsteps from "./footsteps2.png";
import goldenApple from "./goldenApple.png";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
  },
  cell: {
    width: "2em",
    height: "2em",
    border: "1px solid black",
    margin: "0.4px",
  },
  startCell: {
    backgroundColor: "red",
    backgroundImage: `url(${Mario})`,
    backgroundOrigin: "center",
    backgroundSize: "cover",
  },
  endCell: {
    backgroundColor: "black",
    backgroundImage: `url(${goldenApple})`,
    backgroundOrigin: "center",
    backgroundSize: "cover",
  },
}));

const PathfinderVisualizer = () => {
  const classes = useStyles();
  const [state, setState] = useState({ array: [] });
  const [start_index] = useState({ x: 3, y: 0 });
  const [end_index] = useState({ x: 19, y: 15 });
  useEffect(() => {
    resetArray();
  }, []);
  const resetArray = () => {
    const array2D = [];

    for (let i = 0; i < 20; i++) {
      const array1D = [];
      for (let j = 0; j < 40; j++) {
        array1D.push(1);
      }
      array2D.push(array1D);
    }
    console.log(array2D);
    setState({ array: array2D });
  };
  const BFS_Search = () => {
    let { animation, shortestPath, found } = BFS(
      state.array,
      start_index,
      end_index
    );
    if (!found) {
      animation = [];
      shortestPath = [];
    } else {
      const arrayCells = document.getElementsByClassName("cell-animation");
      // console.log(arrayBars);
      console.log(shortestPath);

      // barOneStyle.backgroundColor = "red";
      let index;
      for (let i = 0; i < animation.length; i++) {
        for (let j = 0; j < animation[i].length; j++) {
          if (animation[i][j].x === 0) {
            index = animation[i][j].y;
          } else {
            index =
              state.array[0].length * animation[i][j].x + animation[i][j].y;
          }
          // const cellStyle = arrayCells[index].style;
          // setTimeout(() => {
          //   cellStyle.backgroundColor = "#6593A6";
          // }, i * 200);
          if (
            (animation[i][j].x === start_index.x &&
              animation[i][j].y === start_index.y) ||
            (animation[i][j].x === end_index.x &&
              animation[i][j].y === end_index.y)
          ) {
            continue;
          }
          TweenMax.to(arrayCells[index], {
            css: { backgroundColor: "#FCE196" },
            ease: Power3.easeIn,
            delay: convertToMilisec(i * 190),
          });
          // TweenMax.from(arrayCells[index], {
          //   css: { borderRadius: 50 },
          //   ease: Power3.easeOut,
          //   delay: convertToMilisec(i * 100),
          // });
        }
      }

      for (let i = 0; i < shortestPath.length; i++) {
        let index;
        if (shortestPath[i].x === 0) {
          index = shortestPath[i].y;
        } else {
          index = state.array[0].length * shortestPath[i].x + shortestPath[i].y;
        }
        if (
          (shortestPath[i].x === start_index.x &&
            shortestPath[i].y === start_index.y) ||
          (shortestPath[i].x === end_index.x &&
            shortestPath[i].y === end_index.y)
        ) {
          continue;
        }
        TweenMax.to(arrayCells[index], {
          css: {
            backgroundImage: `url(${Mario})`,
            backgroundOrigin: "center",
            backgroundSize: "cover",
          },
          ease: Power3.easeIn,
          delay: convertToMilisec((animation.length + i + 1) * 190),
        });
      }
    }
  };
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.container}
      >
        <Grid item container justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => BFS_Search()}
          >
            Find
          </Button>
        </Grid>
        <Grid item container>
          {state.array.length > 0 &&
            state.array.map((row, row_index) => {
              return (
                <Grid
                  key={row_index}
                  item
                  container
                  justifyContent="center"
                  alignItems="center"
                >
                  {row &&
                    row.length !== 0 &&
                    row.map((col, col_index) => {
                      return (
                        <Grid
                          key={col_index}
                          item
                          className={`${classes.cell} ${
                            row_index === start_index.x &&
                            col_index === start_index.y &&
                            classes.startCell
                          } ${
                            row_index === end_index.x &&
                            col_index === end_index.y &&
                            classes.endCell
                          } cell-animation`}
                        ></Grid>
                      );
                    })}
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </>
  );
};

const convertToMilisec = (sec) => {
  return sec / 1000;
};

export default PathfinderVisualizer;
