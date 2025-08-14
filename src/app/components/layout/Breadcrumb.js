import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Breadcrumb extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isArabic: false,
        }
    }

    componentDidMount() {
        this.assignTitleAndBreadCrumb();
        this.languageSelector()

    }

    render() {
        return (
            <nav dir={this.state.isArabic ? "rtl" : "ltr"} aria-label="breadcrumb" className={this.state.isArabic ? "breadcrumb-block-arabic" : "breadcrumb-block"}>
                {/* { this.props.breadCrumbDetail.isBreadCrumb &&
                    <label>
                        <label className={this.state.isArabic ? "breadcrumb-text-arabic" : "breadcrumb-text"}>{this.props.breadCrumbDetail.title}</label>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to={this.props.breadCrumbDetail.link}>
                                    {this.props.breadCrumbDetail.firstBreadCrumbText}
                                </Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">{this.props.breadCrumbDetail.secondBreadCrumbText}</li>
                        </ol>
                    </label>
                } */}
            </nav>
        );
    }

    assignTitleAndBreadCrumb() {
        const urlKeys = document.URL.split("/");
        if (urlKeys[urlKeys.length - 1] === "onAdmissionDeathReg" || urlKeys[urlKeys.length - 1] === "onAdmissionDeathReg#" || (urlKeys[urlKeys.length - 2] === "onAdmissionDeathReg" && urlKeys[urlKeys.length - 1] === "")) {
            this.setState({ title: "On Admission Death Registration", firstBreadCrumbText: "Registration", secondBreadCrumbText: "On Admission Death Registration", firstBreadcrumbLink: "/infirma/registration" })
        }
    }

    async languageSelector() {
        const { isArabic } = this.state;
        let language = localStorage.getItem("language")

        if (language === "arb") {
            await this.setState({ isArabic: true });
            // isArabic = true
        } if (language !== "arb") {
            // isArabic = false;
            await this.setState({ isArabic: false });
        }
        console.log("this.state.isArabic users", this.state.isArabic);
    }

}

const mapStateToProps = (state, ownProps) => {
    return { breadCrumbDetail: state.breadcrumb.breadCrumbDetail };
};

export default connect(mapStateToProps)(Breadcrumb);