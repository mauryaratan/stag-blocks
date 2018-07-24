import Settings from './settings';

const {
	createElement,
	Component,
} = wp.element;

const { __ } = wp.i18n;

export default class RenderBlockSettings extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			values: [],
		};

		this.settings = Settings[ this.props.name ];

		this.handleChange = this.handleChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
	}

	handleChange( event ) {
		const { id, value } = event.target;

		const newValue = this.state.values;
		newValue[ id ] = value;

		this.setState( { values: newValue } );
	}

	handleSubmit( event ) {
		event.preventDefault();

		// TODO: Do something with the values here.
		const values = this.state.values;
	}

	render() {
		return (
			<div
				className="block-settings"
				hidden={ ! this.props.initialOpen }
			>
				<h3>{ __( 'Settings' ) }</h3>
				<form
					onSubmit={ ( event ) => this.handleSubmit( event ) }
				>
					<table className="form-table">
						<tbody>
							{ Object.keys( this.settings ).map( ( section ) => {
								const setting = this.settings[ section ];
								return (
									<tr key={ section }>
										<th scope="row">
											{ createElement( 'label', {
												htmlFor: section,
											}, setting.label ) }
										</th>

										<td>
											{ createElement( 'input', {
												type: setting.type,
												className: 'regular-text',
												id: section,
												onChange: this.handleChange,
											} ) }

											{ createElement( 'p', {
												className: 'description',
											}, setting.description ) }
										</td>
									</tr>
								);
							} ) }
						</tbody>
					</table>
					<button className="button button-primary" type="submit">{ __( 'Save settings' ) }</button>
				</form>
			</div>
		);
	}
}
