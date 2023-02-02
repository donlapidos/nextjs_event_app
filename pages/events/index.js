import Image from 'next/image';
import React from 'react';
import Link from "next/link";

const eventsPage = ({ data }) => {
    return (
        <div>
            <h1>Events Page</h1>
            {data.map((ev) => (
                <Link key={ev.id} href={`/events/${ev.id}`} passHref>
                    <Image src={ev.image} alt={ev.title} width={200} height={100} />
                    <h2>{ev.title}</h2>
                </Link>
            ))}
        </div>
    )
}

export default eventsPage;

export async function getServerSideProps() {
    const { events_categories } = await import("/data/data.json");

    return {
        props: {
            data: events_categories
        }
    }
}

