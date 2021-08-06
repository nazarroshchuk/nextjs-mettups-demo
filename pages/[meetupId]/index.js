import MeetupDetail from "../../components/meetups/MeetupDetail";
import { getMeetupsStaticPaths } from "../../services/getMeetupsStaticPaths";
import { getOneMeetupId } from "../../services/getOneMeetupId";
import Head from "next/head";
import { Fragment } from "react";



const MeetupDetails = (props) => {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta
                    name="description"
                    content={props.meetupData.description}
                />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>
    )
}

export async function getStaticPaths() {
    const meetups = await getMeetupsStaticPaths();

    return {
        fallback: "blocking",
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
        })),
    };
}

export async function getStaticProps(context) {
    //fetch data for a single meetup
    const meetupId = context.params.meetupId;

    const selectedMeetup = await getOneMeetupId(meetupId);

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            }
        }
    }
}

export default MeetupDetails;
