package by.project.reactor.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CITY")
public class City implements Serializable {
    @Id
    @GeneratedValue
    @Column(name = "ID")
    private Integer id;
//    @ManyToOne(fetch = FetchType.EAGER)
    @Column(name = "NAME_RU")
    private String nameRu;
    @Column(name = "NAME_EN")
    private String nameEn;
    @Column(name = "COUNTRY_CODE")
    private String country;
//    @ManyToOne(optional = true)
    @Column(name = "STATE_ID")
    private Integer state;
    @Column(name = "LATITUDE", columnDefinition = "decimal(10,5)")
    private Double latitude;
    @Column(name = "LONGITUDE", columnDefinition = "decimal(10,5)")
    private Double longitude;
    @Column(name = "TIMEZONE")
    private String timezone;

    public City() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNameRu() {
        return nameRu;
    }

    public void setNameRu(String nameRu) {
        this.nameRu = nameRu;
    }

    public String getNameEn() {
        return nameEn;
    }

    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }
}
