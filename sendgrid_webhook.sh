function localtunnel {
  lt -s passeboko666 --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done