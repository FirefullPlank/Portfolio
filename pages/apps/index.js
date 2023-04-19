import { Box, Button, Grid, Heading, Image, Link, Text } from "@chakra-ui/react"
import { apps } from "../../constants/constants"
import Head from "next/head";

function remrange(start, end) {
    return new Array(end - start).fill().map((d, i) => `${i + start}rem`);
}

const App = ({ project }) => {
    return (
        <Box 
            borderRadius={"10px"}
            boxShadow="3px 3px 20px rgba(80, 78, 78, 0.5)"
            textAlign={"center"}
            width={remrange(15,30)}
            position={'relative'}
            _hover={{
                transform: 'scale(1.05)',
                transition: 'all 0.1s ease-in-out',
            }}
        >
            <Image
                width={"100%"}
                height={"10rem"}
                overflow={"hidden"}
                src={project.image}
                alt="app image"
                rounded={"10px 10px 0 0"}
            />
            <Text
                fontWeight={500}
                letterSpacing="2px"
                color="blue.300"
                padding=".5rem 0"
                fontSize={(props) => props.title ? '3rem' : '2rem'}
            >
                {project.title}
            </Text>
            <Box
                width={"50px"}
                height={"3px"}
                margin="20px auto"
                border="0"
                bgColor="#fff"
                borderRadius={"10px"}
        bg={(props) => props.colorAlt ? 
            'linear-gradient(270deg, #F46737 0%, #945DD6 100%)' :
            'linear-gradient(270deg, #13ADC7 0%, #945DD6 100%)'}
            />
            <Text
                width={"90%"}
                margin="1rem"
                opacity={0.8}
                fontStyle="2rem"
                lineHeight={"24px"}
                paddingBottom={"5rem"}
                justifyItems="center"
            >
                {project.description}
            </Text>
            <Box >
                <hr color="orange" style={{ margin: '1rem' }}/>
                <Box justifyContent="center" display={"flex"} padding="0 2rem 1rem 2rem">
                    <Link href={project.play}>
                        <Button colorScheme='orange' size='md' mt="1rem">Open</Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

const Apps = () => {
    return (
        <Box className="section" paddingTop="2rem" maxW={"90%"}>
            <Head>
                <title>Apps - FirePlank</title>
                <meta property="og:url" content="https://fireplank.xyz/apps" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Apps" />
                <meta name="description" content="My portfolio website to showcase some of my projects and skills." />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="keywords" content="portfolio, fireplank, tech, technology" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box className="section-container">
                <Heading
                fontSize={["2.5rem", "3rem", "3.5rem"]}
                lineHeight={["2.5rem", "3rem", "3.5rem"]}
                className="section-header">
                    Apps
                </Heading>
            </Box>
            <Grid
                templateColumns="repeat(auto-fill, 350px)"
                gap="1rem"
                padding="3rem"
                paddingLeft={{ base: "0rem", md: "10rem" }}
                placeItems={"end"}>
                    {apps.map((app, i) => (
                      <App key={`app${i}`} project={app}/>
                    ))}
                </Grid>
        </Box>
    )
}
export default Apps