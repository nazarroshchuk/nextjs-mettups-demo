import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { getAllMeetups } from "../services/getAllMeetups";
import { Fragment } from "react";



function HomePage(props) {
    console.log(props)
    return (
            <Fragment>
                <Head>
                    <title>React Meetups</title>
                    <meta
                        name="description"
                        content="Browse a huge list of highly active meetups!"
                    />
                </Head>
                <MeetupList meetups={props.meetups} />
            </Fragment>
    )
}

// export async function getServerSideProps(context) {
//     // fetch data from an API
//     // read data from  filesystem
//
//     const request = context.request;
//     const response = context.response;
//
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
    // fetch data from an API
    // read data from  filesystem
    const meetups = await getAllMeetups();

    console.log('meetups',meetups);

    return {
        props: {
            meetups: meetups.map(m => ({
                title: m.title,
                address: m.address,
                image: m.image,
                id: m._id.toString(),
            })),
        },
        revalidate: 1,
    }
}

export default HomePage;
