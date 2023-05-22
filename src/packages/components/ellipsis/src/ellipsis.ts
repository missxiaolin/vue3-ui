import { buildProps } from '../../../utils/props';

export const EllipsisProps = buildProps({
    rows: {
        type: Number,
        default: 1
    },
    dots: {
        type: String,
        default: '...'
    },
    content: {
        type: String,
        default: ''
    },
    expandText: {
        type: String,
        default: ''
    },
    collapseText: {
        type: String,
        default: ''
    }
})