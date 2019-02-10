import React, { PureComponent, Fragment } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

class MemberFormReview extends PureComponent {
	state = {
		selectedFile: null,
		imageUrl: null,
		imageUpload: null
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

	handleFileUpload = async (e) => {
		e.preventDefault();

		const data = new FormData();

		data.append('file', this.state.selectedFile, this.state.selectedFile.name);

		try {
			const response = await axios.post('/api/upload', data);

			this.setState({ imageUrl: response.data, imageUpload: 'Image Uploaded Successfully' });
			this.props.formValues['imageUrl'] = this.state.imageUrl.public_id;
			console.log(this.state.imageUrl, this.props.formValues);
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		return (
			<Fragment>
				{this.reviewFields()}
				<div>
					<label>Date of Birth</label>
					{this.props.formValues['birthDate']}
				</div>

				<Fragment>
					<h3>{this.state.imageUpload && this.state.imageUpload}</h3>
					<form onSubmit={this.handleFileUpload}>
						<label>Upload Avatar</label>
						<input type="file" name="image" onChange={this.handleFileSelect} required />
						{this.state.selectedFile === null ? (
							<button disabled>Upload</button>
						) : (
							<button type="submit">Upload</button>
						)}
					</form>
				</Fragment>
				<button onClick={this.props.onCancel}>Back</button>
				<button onClick={() => this.props.addMember(this.props.formValues, this.props.history)}>Next</button>
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		formValues: state.form.memberForm.values
	};
}

export default connect(mapStateToProps, actions)(withRouter(MemberFormReview));
