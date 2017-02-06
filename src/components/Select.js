import createComponent from '../createComponent';
import TagNode from '../nodes/TagNode';
import { applyBatch } from '../client/rafBatch';
import merge from '../utils/merge';
import isInArray from '../utils/isInArray';

export default createComponent({
    onInit() {
        this._addAttrs = {
            onChange : e => {
                this.onChange(e);
            }
        };
    },

    onRender() {
        return new TagNode('select')
            .attrs(merge(this.attrs, this._addAttrs))
            .children(this.children);
    },

    onChange(e) {
        const { target } = e,
            { onChange, multiple } = this.attrs;

        if(onChange) {
            if(multiple) {
                const newValue = [],
                    { options } = target,
                    len = options.length;
                let i = 0,
                    option;

                while(i < len) {
                    option = options[i++];
                    if(option.selected) {
                        newValue.push(option.value);
                    }
                }

                onChange(e, newValue);
            }
            else {
                onChange(e);
            }
        }

        applyBatch();

        if(this.isMounted()) {
            const { value, multiple } = this.attrs; // attrs could be changed during applyBatch()

            if(typeof value !== 'undefined') {
                if(multiple) {
                    const { options } = target,
                        len = options.length;
                    let i = 0,
                        option;

                    while(i < len) {
                        option = options[i++];
                        option.selected = isInArray(value, option.value);
                    }
                }
                else if(target.value != value) {
                    target.value = value;
                }
            }
        }
    },

    onRefRequest() {
        return this.getDomNode();
    }
});
