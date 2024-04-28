import React, { useState } from "react";
import styles from "./Jobs.module.css";
import { IoTimeOutline } from "react-icons/io5";
import Logo1 from '../../Assets/Logo1.svg';
import Logo2 from '../../Assets/Logo2.svg';
import Logo3 from '../../Assets/Logo3.svg';
import Logo4 from '../../Assets/Logo4.svg';
import Logo5 from '../../Assets/Logo5.svg';
import Logo6 from '../../Assets/Logo6.svg';

import Search from '../SearchDiv/Search';

const initialJobs = [ 
    {
        id: 1,
        title: "Web Developer",
        company: "Netflix",
        logo: Logo1,
        type: "Full-time",
        level: "Junior",
        location: "USA",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, soluta facere ullam unde recusandae autem nisi adipisci assumenda veritatis excepturi fuga totam. Eum recusandae expedita culpa natus. Sint, non nisi.",
        time: "Now"
    },
    {
        id: 2,
        title: "Backend Developer",
        company: "Meta",
        logo: Logo2,
        type: "Half-time",
        level: "Junior",
        location: "London",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, soluta facere ullam unde recusandae autem nisi adipisci assumenda veritatis excepturi fuga totam. Eum recusandae expedita culpa natus. Sint, non nisi.",
        time: "Now"
    },
    {
        id: 3,
        title: "UI Designer",
        company: "Twitter",
        logo: Logo3,
        type: "Full-time",
        level: "Junior",
        location: "Armenia",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, soluta facere ullam unde recusandae autem nisi adipisci assumenda veritatis excepturi fuga totam. Eum recusandae expedita culpa natus. Sint, non nisi.",
        time: "Now"
    },
    {
        id: 4,
        title: "Project Manager",
        company: "Google",
        logo: Logo4,
        type: "Full-time",
        level: "Junior",
        location: "Armenia",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, soluta facere ullam unde recusandae autem nisi adipisci assumenda veritatis excepturi fuga totam. Eum recusandae expedita culpa natus. Sint, non nisi.",
        time: "Now"
    },
    {
        id: 5,
        title: "FullStack Developer",
        company: "Microsoft",
        logo: Logo5,
        type: "Full-time",
        level: "Senior",
        location: "Italy",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, soluta facere ullam unde recusandae autem nisi adipisci assumenda veritatis excepturi fuga totam. Eum recusandae expedita culpa natus. Sint, non nisi.",
        time: "Now"
    },
    {
        id: 6,
        title: "Backend Developer",
        company: "Figma",
        logo: Logo6,
        type: "Full-time",
        level: "Junior",
        location: "Armenia",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, soluta facere ullam unde recusandae autem nisi adipisci assumenda veritatis excepturi fuga totam. Eum recusandae expedita culpa natus. Sint, non nisi.",
        time: "Now"
    },
];

const Jobs = () => {
    const [jobs, setJobs] = useState(initialJobs);
    const [filteredJobs, setFilteredJobs] = useState(initialJobs); 
    const [displayedJobsCount, setDisplayedJobsCount] = useState(3); // Initial number of jobs to display

    const handleSearch = (searchTerm, companySearchTerm, locationSearchTerm) => {
        const filtered = initialJobs.filter(job => {
            const titleMatch = searchTerm ? job.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
            const companyMatch = companySearchTerm ? job.company.toLowerCase().includes(companySearchTerm.toLowerCase()) : true;
            const locationMatch = locationSearchTerm ? job.location.toLowerCase().includes(locationSearchTerm.toLowerCase()) : true;
            return titleMatch && companyMatch && locationMatch;
        });

        setFilteredJobs(filtered);
    };

    const handleFilter = (levelSearchTerm, typeSearchTerm) => {
        const filtered = initialJobs.filter(job => {
            const levelMatch = levelSearchTerm ? job.level.toLowerCase() === levelSearchTerm.toLowerCase() : true;
            const typeMatch = typeSearchTerm ? job.type.toLowerCase() === typeSearchTerm.toLowerCase() : true;
            return levelMatch && typeMatch;
        });
    
        setFilteredJobs(filtered);
    };

    const handleClearAllFilters = () => {
        setFilteredJobs(initialJobs);
    };

    const handleShowMore = () => {
        console.log("Show more button clicked");
        setDisplayedJobsCount(prevCount => prevCount + 3); // Increase the number of displayed jobs
    };

    console.log("Displayed jobs count:", displayedJobsCount);

    return (
        <div>
            <Search onSearch={handleSearch} onFilter={handleFilter} onClearAll={handleClearAllFilters} />
            <div className={styles.jobContainer}>
                {filteredJobs.slice(0, displayedJobsCount).map(job => (
                    <div key={job.id} className={styles.singleJob}>
                        <span className={styles.flex_container}>
                            <div className={styles.company_container}>
                                <img src={job.logo} alt="Company Logo" />
                                <h1 className={styles.text_heading}>{job.title}</h1>
                            </div>
                            <span className={styles.span}>
                                <IoTimeOutline />{job.time}
                            </span>
                        </span>
                        <span className={styles.company_name}>{job.company}</span>
                        <button className={styles.button17}>{job.type}</button>
                        <button className={styles.button17}>{job.level}</button>
                        <button className={styles.button17}>{job.location}</button>
                        <p className={styles.custom_paragraph}>{job.description}</p>
                        <button className={styles.button13}>Apply Now</button>
                    </div>
                ))}
            </div>
            {displayedJobsCount < filteredJobs.length && (
                <div className={styles.showMoreButtonContainer}>
                    <button className={styles.showMoreButton} onClick={handleShowMore}>Show More</button>
                </div>
            )}
        </div>
    );
};

export default Jobs;
