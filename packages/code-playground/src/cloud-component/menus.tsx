import uiStore from '@/store/ui';
import Dependencies from './dependencies';
import Components from './components';

export default ({
  component,
  setComponent,
  onAdd,
  dependencies,
  setDependencies,
  onAddDep,
  onUpdateDep,
}) => {
  const { activeTab } = uiStore.useSnapshot();
  return (
    <div className="cloud-component-left">
      <Components
        {...{
          component,
          setComponent,
          onAdd,
          activeTab,
        }}
      />
      <Dependencies
        activeTab={activeTab}
        dependencies={dependencies}
        setDependencies={setDependencies}
        onAddDep={onAddDep}
        onUpdateDep={onUpdateDep}
      />
    </div>
  );
};
