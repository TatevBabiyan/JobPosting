import React, { useState, useEffect } from "react";
import styles from "./Jobs.module.css";
import { IoTimeOutline } from "react-icons/io5";

// Import logos
import Logo4 from '../../Assets/Logo4.svg';
import Logo5 from '../../Assets/Logo5.svg';

const initialJobs = [
    {
        id: 1,
        title: "Backend Developer",
        company: "Google",
        logo: Logo4,
        type: "Full-time",
        level: "Junior",
        location: "Remote",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, soluta facere ullam unde recusandae autem nisi adipisci assumenda veritatis excepturi fuga totam. Eum recusandae expedita culpa natus. Sint, non nisi.",
        time: "Now"
    },
    // Add more initial job data if needed
];

const Jobs = ({ searchTerm, companySearchTerm, locationSearchTerm, sortBy, level, type }) => {
    const [jobs, setJobs] = useState(initialJobs);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [newJobForm, setNewJobForm] = useState({
        title: "",
        company: "",
        logo: null,
        type: "",
        level: "",
        location: "",
        description: "",
        time: "Now"
    });

    useEffect(() => {
        // Filter jobs based on search terms and filters
        const filtered = jobs.filter(job => {
            const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
            const companyMatch = job.company.toLowerCase().includes(companySearchTerm.toLowerCase());
            const locationMatch = job.location.toLowerCase().includes(locationSearchTerm.toLowerCase());
            const typeMatch = job.type.toLowerCase().includes(type.toLowerCase());
            const levelMatch = job.level.toLowerCase().includes(level.toLowerCase());

            return titleMatch && companyMatch && locationMatch && typeMatch && levelMatch;
        });

        setFilteredJobs(filtered);
    }, [jobs, searchTerm, companySearchTerm, locationSearchTerm, sortBy, level, type]);

    const deleteJob = (id) => {
        const updatedJobs = jobs.filter(job => job.id !== id);
        setJobs(updatedJobs);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewJobForm({ ...newJobForm, [name]: value });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setNewJobForm({ ...newJobForm, logo: URL.createObjectURL(file) });
    };

    const addJob = () => {
        const newJob = {
            id: jobs.length + 1,
            title: newJobForm.title,
            company: newJobForm.company,
            logo: newJobForm.logo || Logo5, 
            type: newJobForm.type,
            level: newJobForm.level,
            location: newJobForm.location,
            description: newJobForm.description,
            time: newJobForm.time
        };
        const updatedJobs = [...jobs, newJob]; 
        setJobs(updatedJobs);

        const filtered = updatedJobs.filter(job => {
            const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
            const companyMatch = job.company.toLowerCase().includes(companySearchTerm.toLowerCase());
            const locationMatch = job.location.toLowerCase().includes(locationSearchTerm.toLowerCase());
            const typeMatch = job.type.toLowerCase().includes(type.toLowerCase());
            const levelMatch = job.level.toLowerCase().includes(level.toLowerCase());

            return titleMatch && companyMatch && locationMatch && typeMatch && levelMatch;
        });

        if (sortBy === "inclusive") {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "starts_with") {
            filtered.sort((a, b) => a.title.startsWith(b.title) ? -1 : 1);
        } else if (sortBy === "contains") {
            filtered.sort((a, b) => a.title.includes(b.title) ? -1 : 1);
        }

        setFilteredJobs(filtered); 

        setNewJobForm({
            title: "",
            company: "",
            logo: null,
            type: "",
            level: "",
            location: "",
            description: "",
            time: "Now"
        });
    };

    return (
        <div>
            <div className={styles.jobContainer}>
                {filteredJobs.map(job => (
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

                        {/* Display job details */}
                        <button className={styles.button17}>{job.type}</button>
                        <button className={styles.button17}>{job.level}</button>
                        <button className={styles.button17}>{job.location}</button>

                        <p className={styles.custom_paragraph}>{job.description}</p>
                        <button className={styles.button13}>Apply Now</button>
                        <button className={styles.button13} onClick={() => deleteJob(job.id)}>Delete</button>
                    </div>
                ))}
            </div>
            {/* Form to add new job */}
            <div className={styles.singleJob}>
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={newJobForm.title}
                    onChange={handleChange}
                    className={styles.inputField}
                />
                <input
                    type="text"
                    placeholder="Company"
                    name="company"
                    value={newJobForm.company}
                    onChange={handleChange}
                    className={styles.inputField}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className={styles.inputField}
                />
                <input
                    type="text"
                    placeholder="Type"
                    name="type"
                    value={newJobForm.type}
                    onChange={handleChange}
                    className={styles.inputField}
                />
                <input
                    type="text"
                    placeholder="Level"
                    name="level"
                    value={newJobForm.level}
                    onChange={handleChange}
                    className={styles.inputField}
                />
                <input
                    type="text"
                    placeholder="Location"
                    name="location"
                    value={newJobForm.location}
                    onChange={handleChange}
                    className={styles.inputField}
                />
                <input
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={newJobForm.description}
                    onChange={handleChange}
                    className={styles.inputField}
                />
                <button className={styles.button13} onClick={addJob}>Post</button>
            </div>
        </div>
    );
};

export default Jobs;