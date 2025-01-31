'use client';
import React, { useState, useEffect } from 'react';
import PassDesign from '../passdesign';

interface Participant {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    affiliation: string;
};

const Generator = () => {
    const [data, setData] = useState<Participant[]>([]);
    const [visibleData, setVisibleData] = useState<Participant[]>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setData([]);
        // import('@/resources/test.json')
        //     .then((jsonData: any) => setData(jsonData.default))
        //     .catch((error) => console.error("Error loading JSON:", error));
    }, []);

    useEffect(() => {
        if (data.length > 0 && index < data.length) {
            const timer = setTimeout(() => {
                setVisibleData((prev) => [...prev, data[index]]);
                setIndex((prevIndex) => prevIndex + 1);
            }, 1500); // Delay of 1 second

            return () => clearTimeout(timer);
        }
    }, [data, index]);

    return (
        <div className='flex flex-row flex-wrap items-center'>
            {visibleData.map((item, idx) => (
                <div key={idx}>
                    <p>Index: {idx+1}</p>
                    <div className='max-w-xl'>
                    <PassDesign
                        name={item.name}
                        email={item.email}
                        mobile={item.mobile?.toString()}
                        affiliation={item.affiliation}
                        sendMailStatus={true}
                    />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Generator;
