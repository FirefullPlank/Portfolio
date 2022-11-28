import { Box } from '@chakra-ui/react'
import Head from 'next/head'

export default function Home() {
  return (
    <Box >
      <Head>
        <title>Home - FirePlank</title>
        <meta property="og:url" content="https://www.fireplank.xyz/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FirePlank&apos;s Website" />
        <meta property="fb:app_id" content="xyz.fireplank.www" />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="A very responsive and good looking website to showcase me and my skills."
        />
        <meta property="og:image" content="/images/fireplank.png" />
        <meta name="description" content="FirePlank&apos;s website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="portfolio, fireplank, tech, technology" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Box>
  )
}
