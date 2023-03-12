import Button from "components/Button/ButtonV2";
import Icon from "components/Icon";

const ButtonComponents = () => {
  return (
    <div className="flex flex-col">
      <h2 className="mb-6 text-h2">Button</h2>
      <h5 className="mb-3 text-h5">Primary</h5>
      <div className="flex flex-row items-center justify-start mb-3 space-x-4">
        <div>
          <h6 className="mb-2">Normal</h6>
          <Button type="button" variant="primary">
            Button
          </Button>
        </div>
        <div>
          <h6 className="mb-2">Disabled</h6>
          <Button type="button" variant="primary" disabled>
            Button
          </Button>
        </div>
        <div>
          <h6 className="mb-2">Loading</h6>
          <Button type="button" variant="primary" loading>
            Button
          </Button>
        </div>
        <div>
          <h6 className="mb-2">With left-1</h6>
          <Button type="button" variant="primary" left="T">
            Button
          </Button>
        </div>
        <div>
          <h6 className="mb-2">With left-2</h6>
          <Button type="button" variant="primary" left={<Icon name="download" />}>
            Button
          </Button>
        </div>
      </div>
      <h5 className="mb-3 text-h5">Secondary</h5>
      <div className="flex flex-row items-center justify-start mb-3 space-x-4">
        <div>
          <h6 className="mb-2">Normal</h6>
          <Button type="button" variant="secondary">
            Button
          </Button>
        </div>
        <div>
          <h6 className="mb-2">Disabled</h6>
          <Button type="button" variant="secondary" disabled>
            Button
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonComponents;
