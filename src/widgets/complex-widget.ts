import './complex-widget.scss';

VSS.init({
  explicitNotifyLoaded: true,
  usePlatformStyles: true,
});

VSS.require(
  ["TFS/Dashboards/WidgetHelpers", "VSS/Service", "TFS/WorkItemTracking/RestClient"],
  (WidgetHelpers: {
  IncludeWidgetStyles: () => void; WidgetStatusHelper: {
    Success: () => void;
  };
  }) => {
  WidgetHelpers.IncludeWidgetStyles();
  VSS.register("ComplexWidget", () => {
    return {
    load(widgetSettings: any) {
      const projectId = VSS.getWebContext().project.id;
      // console.log("Project Id | " + projectId);
      // console.log(widgetSettings);

      return WidgetHelpers.WidgetStatusHelper.Success();
    },
    };
  });
  VSS.notifyLoadSucceeded();
  });
