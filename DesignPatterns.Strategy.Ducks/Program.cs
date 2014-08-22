using System;

namespace DesignPatterns.Strategy.Ducks
{
    class Program
    {
        public static void Main(string[] args)
        {
            MallardDuck mallardDuck = new MallardDuck();
            RedheadDuck redheadDuck = new RedheadDuck();
            RubberDuck rubberDuck = new RubberDuck();

            Console.WriteLine(mallardDuck.Display() + " # " + mallardDuck.PerformFly().ToString() + " # " + mallardDuck.PerformQuack().ToString());
            Console.WriteLine(redheadDuck.Display() + " # " + redheadDuck.PerformFly().ToString() + " # " + redheadDuck.PerformQuack().ToString());
            Console.WriteLine(rubberDuck.Display() + " # " + rubberDuck.PerformFly().ToString() + " # " + rubberDuck.PerformQuack().ToString());
            
            Console.ReadLine();
        }
    }
}
