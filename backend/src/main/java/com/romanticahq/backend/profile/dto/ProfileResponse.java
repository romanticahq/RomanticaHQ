package com.romanticahq.backend.profile.dto;

public class ProfileResponse {

    private Long userId;
    private String fullName;
    private Integer age;
    private String gender;
    private String location;
    private String bio;
    private String intention;
    private String lookingFor;

    public ProfileResponse() {}

    public ProfileResponse(
            Long userId,
            String fullName,
            Integer age,
            String gender,
            String location,
            String bio,
            String intention,
            String lookingFor
    ) {
        this.userId = userId;
        this.fullName = fullName;
        this.age = age;
        this.gender = gender;
        this.location = location;
        this.bio = bio;
        this.intention = intention;
        this.lookingFor = lookingFor;
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getIntention() { return intention; }
    public void setIntention(String intention) { this.intention = intention; }

    public String getLookingFor() { return lookingFor; }
    public void setLookingFor(String lookingFor) { this.lookingFor = lookingFor; }
}

