// Columns.js
import React from 'react';
import ChildTemplate from './ChildTemplate';

class Columns {
    constructor({ data }) {
        this.data = data;
    }

    render() {
        const container = document.createElement('div');
        container.classList.add('columns-template');

        this.data.blocks.forEach(block => {
            const childTemplate = new ChildTemplate({ data: block.data });
            container.appendChild(childTemplate.render());
        });

        return container;
    }

    static get toolbox() {
        return {
            title: 'Columns',
            icon: '<svg>...</svg>', // Use appropriate icon here
        };
    }
}

export default Columns;
