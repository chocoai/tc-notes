using System;

namespace DesignPatterns.Strategy.Ducks
{
    public class FlyNoWay : IFlyBehavior
    {
        public FlyNoWay()
        {

        }

        #region IFlyBehavior Members

        public object Fly()
        {
            return "²»»á·É£¡";
        }

        #endregion
    }
}
