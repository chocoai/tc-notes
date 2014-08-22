using System;

namespace DesignPatterns.Strategy.Ducks
{
	public class FlyWithWings : IFlyBehavior
	{
		public FlyWithWings()
		{}

		#region IFlyBehavior Members

		public object Fly()
		{
			return "Œ“∑…¿≤£°";
		}

		#endregion
	}
}
