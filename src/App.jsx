import React, { useState } from "react";
import Jobs from "./Components/JobDiv/Jobs";
import Search from "./Components/SearchDiv/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [companySearchTerm, setCompanySearchTerm] = useState("");
    const [locationSearchTerm, setLocationSearchTerm] = useState("");
    const [level, setLevel] = useState("");
    const [type, setType] = useState("");

    const onFilter = (level, type) => {
        console.log("Filtering by:", level, type);
        setLevel(level);
        setType(type);
    };

    return (
        <Router>
            <div>
                <Search
                    onSearch={(searchTerm, companySearchTerm, locationSearchTerm) => {
                        setSearchTerm(searchTerm);
                        setCompanySearchTerm(companySearchTerm);
                        setLocationSearchTerm(locationSearchTerm);
                    }}
                    onClearAll={() => {
                        setSearchTerm("");
                        setCompanySearchTerm("");
                        setLocationSearchTerm("");
                        setLevel("");
                        setType("");
                    }}
                    onFilter={onFilter} 
                />
                <Routes>
                    <Route
                        path="/"
                        element={<Jobs
                            searchTerm={searchTerm}
                            companySearchTerm={companySearchTerm}
                            locationSearchTerm={locationSearchTerm}
                            level={level}
                            type={type}
                        />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
