import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';

class TextExtractor extends React.Component {
    container = null;

    componentDidMount() {
        if (!this.props.component) {
            return;
        }
        this.container = document.createElement('div');
        this.container.style.display = 'none'; // Hide the container
        document.body.appendChild(this.container);

        this.renderOffscreen();
    }

    componentDidUpdate(prevProps) {
        if (this.props.component !== prevProps.component) {
            this.renderOffscreen();
        }
    }

    componentWillUnmount() {
        if (!this.props.component) {
            return;
        }
        ReactDOM.unmountComponentAtNode(this.container);
        document.body.removeChild(this.container);
    }

    renderOffscreen = () => {
        if (!this.props.component) {
            return;
        }
        ReactDOM.render(
            <IntlProvider locale="en">
                {this.props.component}
            </IntlProvider>,
            this.container,
            () => {
                const text = this.container.textContent || this.container.innerText || "";
                this.props.onExtracted(text);
            }
        );
    };

    render() {
        return null; // Nothing to render
    }
}

export default TextExtractor;
