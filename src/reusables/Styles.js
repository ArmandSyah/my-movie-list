import { blue } from "@material-ui/core/colors";

const styles = theme => ({
  root: {},
  main: {
    // width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(650 + theme.spacing.unit * 3 * 2)]: {
      width: 650,
      marginLeft: "auto",
      marginRight: "auto"
    },
    marginTop: theme.spacing.unit * 8
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    backgroundColor: theme.palette.background.paper
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    fullWidth: true,
    display: "flex"
  },
  formIcon: { width: 46, height: 46 },
  line: {
    display: "inline-flex",
    verticalAlign: "bottom"
  },
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  buttonProgress: {
    color: blue[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  showcaseroot: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "space-around",
    paddingBottom: "25px"
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  cardModeRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  cardModeIcon: {
    color: theme.palette.primary.main
  },
  button: {
    margin: 0
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  optionRoot: {
    display: "flex",
    flexWrap: "wrap"
  },
  mediaEntryCard: {
    maxWidth: 345
  },
  mediaEntryPic: {
    height: 280
  },
  coverImg: {
    display: "block",
    maxWidth: "230px",
    maxHeight: "95px",
    width: "auto",
    height: "auto"
  },
  navbarTooltip: {
    borderRadius: "0px",
    width: "132px",
    height: "52px"
  },
  mediaInfoDiv: {
    flexGrow: 3,
    paddingTop: "20px",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "10%",
      paddingRight: "0%"
    },
    [theme.breakpoints.up("xl")]: {
      paddingLeft: "0%",
      paddingRight: "2%"
    }
  },
  cardNoHover: {},
  cardHover: {
    color: theme.palette.primary.main,
    cursor: "pointer"
  }
});

export default styles;
