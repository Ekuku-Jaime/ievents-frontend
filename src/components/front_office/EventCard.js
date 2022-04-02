// import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import styled from '@emotion/styled';
// import {
//   alpha,
//   Box,
//   Card,
//   CardContent,
//   CardMedia,
//   Container,
//   Grid,
//   Link,
//   Typography
// } from '@mui/material';

// import { Icon } from '@iconify/react';
// import eyeFill from '@iconify/icons-eva/eye-fill';
// import shareFill from '@iconify/icons-eva/share-fill';
// import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
// import { fShortenNumber } from '../../utils/formatNumber';

// const CardMediaStyle = styled('div')({
//   position: 'relative'
//   // height: 'calc(100%-70)'
//   // paddingTop: 'calc(100% * 3 / 4)'
// });
// const TitleStyle = styled(Link)({
//   height: 44,
//   overflow: 'hidden',
//   WebkitLineClamp: 2,
//   display: '-webkit-box',
//   WebkitBoxOrient: 'vertical'
// });
// const CoverImgStyle = styled('img')({
//   top: 0,
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
//   position: 'absolute'
// });

// const InfoStyle = styled('div')(({ theme }) => ({
//   display: 'flex',
//   flexWrap: 'wrap',
//   justifyContent: 'flex-end',
//   marginTop: theme.spacing(3),
//   color: theme.palette.text.disabled
// }));
// export default function Home() {
//   const POST_INFO = [
//     { number: 12, icon: messageCircleFill },
//     { number: 23, icon: eyeFill },
//     { number: 1, icon: shareFill }
//   ];
//   return (
//     <Container>
//       <Grid item xs={12} md={6} lg={6}>
//         <Card>
//           <CardMedia
//             component="img"
//             height="200"
//             image="/static/mock-images/covers/cover_3.jpg"
//             alt="Paella dish"
//           />
//           <CardContent>
//             A expressão Lorem ipsum em design gráfico e editoração é um texto padrão em latim
//             utilizado na produção gráfica para preencher os espaços de texto em publicações para
//             testar e ajustar aspectos visuais antes de utilizar conteúdo real.
//           </CardContent>
//         </Card>
//       </Grid>
//     </Container>
//   );
// }

// const CardContentStyle = styled(CardContent)(({ theme }) => ({

// }));

// import React, { memo } from 'react';
// import cx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';

// import TextInfoContent from '@mui-treasury/components/content/textInfo';
// import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
// import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
// import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
// import transionOutline from '@iconify/icons-ant-design/transaction-outline';

// const useStyles = makeStyles(({ breakpoints, spacing }) => ({
//   root: {
//     display: 'flex',
//     margin: 'auto',
//     borderRadius: spacing(2), // 16px
//     transition: '0.3s',
//     boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
//     position: 'relative',
//     maxWidth: 500,
//     marginLeft: 'auto',
//     overflow: 'initial',
//     background: '#ffffff',

//     marginTop: spacing(2),
//     flexDirection: 'column',
//     alignItems: 'center',

//     paddingBottom: spacing(2),
//     [breakpoints.up('md')]: {
//       flexDirection: 'row',
//       paddingTop: spacing(2)
//     }
//     // '&:hover': {
//     //   transform: 'scale(1.1)'
//     // }
//   },
//   media: {
//     width: '88%',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     marginTop: spacing(-1),
//     height: 0,
//     paddingBottom: '48%',
//     borderRadius: spacing(2),
//     backgroundColor: '#fff',
//     position: 'relative',
//     [breakpoints.up('md')]: {
//       width: '100%',
//       marginLeft: spacing(-3),
//       marginTop: 0,
//       transform: 'translateX(-8px)'
//     },
//     '&:after': {
//       content: '" "',
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       // backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
//       borderRadius: spacing(2), // 16
//       opacity: 0.5
//     }
//   },
//   content: {
//     padding: 24
//   },
//   cta: {
//     marginTop: 24,
//     textTransform: 'initial'
//   },
//   time: {
//     fontSize: '0.9rem',
//     color: 'red',
//     top: 0
//   },
//   description: {
//     fontSize: '1rem',
//     display: 'flex',
//     marginTop: spacing(1),
//     marginBottom: '10px',
//     textJustify: 'center'
//   }
// }));

// // eslint-disable-next-line
// export const EventCard = React.memo(function BlogCard() {
//   const styles = useStyles();
//   const { button: buttonStyles, ...contentStyles } = useBlogTextInfoContentStyles();
//   const shadowStyles = useOverShadowStyles();
//   return (
//     <Card className={cx(styles.root, shadowStyles.root)}>
//       <CardMedia
//         className={styles.media}
//         image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/2000px-Git_icon.svg.png"
//       />
//       <CardContent>
//         <TextInfoContent
//           classes={contentStyles}
//           overline="28 MAR 2019"
//           heading="What is Git ?"
//           body="Git is a distributed version control system. Every dev has a working copy of the code and..."
//         />
//         <Button className={buttonStyles}>Read more</Button>
//       </CardContent>
//     </Card>
//   );
// });

// // export const EventCard = memo(function BlogCard({ data }) {
// //   const { title, date } = data;
// //   const styles = useStyles();
// //   const { button: buttonStyles, ...contentStyles } = useBlogTextInfoContentStyles();
// //   const shadowStyles = useOverShadowStyles();
// //   return (
// //     <div>
// //       <Card className={cx(styles.root, shadowStyles.root)}>
// //         <CardMedia className={styles.media} image="/static/mock-images/covers/cover_3.jpg" />
// //         <CardContent>
// //           <span className={styles.time}>{date}</span>
// //           <div className={styles.description}>
// //             {/* heading="What is Git Git is a distributed version control system. ?" */}
// //             {title}
// //           </div>
// //           {/* <TextInfoContent
// //             classes={contentStyles}
// //             overline="28 MAR 2019"
// //             heading="What is Git Git is a distributed version control system.  ?"
// //             // body="Git is a distributed version control system. Every dev has a working copy of the code and..."
// //           /> */}
// //           <Button className={buttonStyles}>Ler mais</Button>
// //         </CardContent>
// //       </Card>
// //       {/* <Box sx={{ width: 500 }}>
// //         <BottomNavigation
// //           showLabels
// //           value={value}
// //           onChange={(event, newValue) => {
// //             setValue(newValue);
// //           }}
// //         >
// //           <BottomNavigationAction label="Recents"  icon={<RestoreIcon />} />
// //           <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
// //           <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
// //         </BottomNavigation>
// //       </Box> */}
// //     </div>
// //   );
// // });

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: 'auto',
    borderRadius: spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    // position: 'relative',
    marginTop: spacing(4),
    maxWidth: 500,
    marginLeft: 'auto',
    overflow: 'initial',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    alignItems: 'center',
    paddingBottom: spacing(2),
    [breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: spacing(2),
      marginLeft: spacing(5)
    }
  },
  media: {
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: spacing(-3),
    height: 0,
    paddingBottom: '48%',
    borderRadius: spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    [breakpoints.up('md')]: {
      width: '200%',
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)'
    },
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
      borderRadius: spacing(2), // 16
      opacity: 0.5
    }
  },
  content: {
    padding: 24
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial'
  },
  container: {
    // overflowX: 'scroll',
    // display: 'flex'
  }
}));
export default function EventCard() {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Card className={styles.root}>
        <CardMedia
          className={styles.media}
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/2000px-Git_icon.svg.png"
        />
        <CardContent>
          {/* <TextInfoContent */}
          {/* classes={contentStyles} */}
          overline="28 MAR 2019" heading="What is Git ?" body="Git is a distributed version control
          system. Every dev has a working copy of the code and..."
          <Button>Read more</Button>
        </CardContent>
      </Card>
    </div>
  );
}
