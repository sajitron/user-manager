import React, { PureComponent, Fragment } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
// @TODO import withRouter
import formFields from './formFields';
import * as actions from '../../actions';

class MemberFormReview extends PureComponent {
	state = {
		selectedFile: null
	};

	reviewFields() {
		console.log(this.props.formValues);
		const reviewFields = _.map(formFields, ({ name, label }) => {
			return (
				<div key={name}>
					<label>{label}</label>
					<div>{this.props.formValues[name]}</div>
				</div>
			);
		});
		return reviewFields;
	}

	handleFileSelect = (event) => {
		this.setState({
			selectedFile: event.target.files[0]
		});
	};

	handleFileUpload = () => {
		const fd = new FormData();
		fd.append('file', this.state.selectedFile, this.state.selectedFile.name);

		axios.post('/api/upload', fd).then((res) => console.log(res));
	};

	render() {
		return (
			<div>
				{this.reviewFields()}
				<div>
					<label>Date of Birth</label>
					{this.props.formValues['birthDate']}

					<Fragment>
						<input type="file" name="image" onChange={this.handleFileSelect} required />
						{this.state.selectedFile === null ? (
							<button disabled onClick={this.handleFileUpload}>
								Upload
							</button>
						) : (
							<button onClick={this.handleFileUpload}>Upload</button>
						)}
					</Fragment>
					<button onClick={this.props.onCancel}>Back</button>
					<button onClick={() => this.props.submitMember(this.props.formValues, this.props.history)}>
						Next
					</button>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		formValues: state.form.memberForm.values
	};
}

export default connect(mapStateToProps, actions)(MemberFormReview);
