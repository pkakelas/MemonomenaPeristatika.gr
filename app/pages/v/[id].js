import Head from 'next/head'
import _ from "lodash"
import Video from "../../components/video"
import Layout from '../../components/layout'

const { getEvents } = require('../../lib/entries')

export default function VideoPage({ video }) {
  const title = `${video.description} - Μεμονωμένο Περιστατικό`
  const image = video.thumbnail ? video.thumbnail : "https://memonomenaperistatika.gr/social-header.jpg?v=1"

  return <Layout>
    <Head>
      <title>{ video.description } - Μεμονωμένο Περιστατικό</title>
      <meta property="og:locale" content="el_GR" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={video.description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={ `https://memonomenaperistatika.gr/v/${video.event_id}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Μεμονωμένα Περιστατικά" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={video.description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
    <Video video={video} />
  </Layout>
}

export async function getStaticPaths() {
  const events = await getEvents()
  const paths = events.map(({event_id}) => ({ params: { id: event_id.toString() } }))

  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const events = await getEvents()
  const video = _.find(events, ['event_id', +params.id])

  return {
    props: { video }
  }
}
