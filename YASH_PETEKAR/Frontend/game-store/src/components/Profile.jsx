import React, { useState, useEffect } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./profile.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

function Profile({ reference }) {
    const userId = Number(localStorage.getItem("userId"));

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        mobile: "",
        dob: "",
        country: "",
        state: "",
        city: ""
    });

    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [errors, setErrors] = useState("");

    useEffect(() => {
        if (!userId) return;

        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8082/api/profiles/users/${userId}`);
                if (response.data) {
                    setFormData({
                        firstName: response.data.firstName || "",
                        lastName: response.data.lastName || "",
                        mobile: response.data.mobile || "",
                        dob: response.data.dob || "",
                        country: response.data.country || "",
                        state: response.data.state || "",
                        city: response.data.city || ""
                    });

                    if (response.data.profileImagePath) {
                        let formattedPath = response.data.profileImagePath.replace(/\\/g, "/");
                        setPreview(formattedPath);
                    }
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setMessage("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "mobile" && !/^\d{0,10}$/.test(value)) {
            setErrors("Mobile number must be 10 digits only");
            return;
        }

        setFormData({ ...formData, [name]: value });
        setIsUpdated(true);

        if (name === "mobile" && value.length === 10) {
            setErrors("");
        }
    };

    const validateMobile = (mobile) => {
        const mobileRegex = /^[0-9]{10}$/;
        return mobileRegex.test(mobile);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
        setPreview(URL.createObjectURL(file));
        setIsUpdated(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert("User ID is missing!");
            return;
        }

        if (!validateMobile(formData.mobile)) {
            setErrors("Invalid mobile number (10 digits required)");
            return;
        }

        const submitData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            submitData.append(key, value);
        });
        if (profileImage) {
            submitData.append("profileImage", profileImage);
        }

        try {
            setLoading(true);
            await axios.put(`http://localhost:8082/api/profiles/users/${userId}/update-profile`, submitData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setMessage("Profile updated successfully!");
            setIsUpdated(false);
            setTimeout(() => {
                window.location.href = "/main";
            }, 1000);
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="Profile" className="profile" ref={reference}>
            {errors && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {errors}
                    <button type="button" className="btn-close" onClick={() => setErrors("")}></button>
                </div>
            )}
            {message && (
                <div className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"} alert-dismissible fade show`} role="alert">
                    {message}
                    <button type="button" className="btn-close" onClick={() => setMessage("")}></button>
                </div>
            )}
            <div className="profile-container">
                {loading && <p className="loading-text">Loading...</p>}
                <div className="profile-image-section">
                    <h2>Profile Picture</h2>
                    <div className="image-preview-box">
                        {preview ? (
                            <img src={preview} alt="Profile Preview" className="profile-preview" />
                        ) : (
                            <span className="placeholder-text">No Image Selected</span>
                        )}
                    </div>
                    <label className="custom-file-upload">
                        Choose File
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </label>
                </div>

                <div className="profile-details-section">
                    <h2>Profile Details</h2>
                    <form onSubmit={handleSubmit} className="profile-form">
                        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required />
                        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required />
                        <input
                            type="text"
                            name="mobile"
                            placeholder="Mobile Number"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            required
                        />
                        <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
                        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} required />
                        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} required />
                        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required />

                        <button type="submit" className="update-button" disabled={!isUpdated}>
                            {loading ? "Updating..." : "Update Profile"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Profile;
