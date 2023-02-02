import React from 'react';
import Image from "next/image";
import Link from "next/link";

const eventsCatPage = ({ data }) => {
    return (
        <div>
            {data.map((ev) => (
                <div>
                    <h1>Events in {ev.city}</h1>
                    <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`} passHref>
                        <Image src={ev.image} alt={ev.title} width={300} height={300} />
                        <h2>{ev.title}</h2>
                        <p>{ev.description}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default eventsCatPage

export async function getStaticPaths() {
    const { events_categories } = await import("/data/data.json");
    const allPaths = events_categories.map((ev) => {
        return {
            params: {
                cat: ev.id.toString()
            }
        }
    })
    return {
        paths: allPaths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const id = context?.params.cat;
    const { allEvents } = await import("/data/data.json");
    const data = allEvents.filter((ev) => ev.city === id);
    return { props: { data } }
}