import React from "react";

interface Props {
  when: Boolean;
}

/**
 * A replacement component for the react-router `Prompt`.
 * Allows for more flexible dialogs.
 *
 * @example
 * <ReactRouterPrompt when={this.props.isDirty}>
 *   {({isOpen, onConfirm, onCancel}) => (
 *     <Modal show={isOpen}>
 *       <div>
 *         <p>Do you really want to leave?</p>
 *         <button onClick={onCancel}>Cancel</button>
 *         <button onClick={onConfirm}>Ok</button>
 *       </div>
 *     </Modal>
 *   )}
 * </ReactRouterPrompt>
 */

const ReactRouterPrompt: React.FC<Props> = ({ when }) => (
  <div>Foo's value is: {when}</div>
);

export default ReactRouterPrompt;
