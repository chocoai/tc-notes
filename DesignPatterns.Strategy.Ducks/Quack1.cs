using System;

namespace DesignPatterns.Strategy.Ducks
{
	public class Quack1 : IQuackBehavior
	{
		public string Quack()
		{
            return "ßÈßÈ";
		}
	}
}
